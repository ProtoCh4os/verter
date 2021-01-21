/* eslint-disable no-console */
import agenda from '../../api/config/jobs';
import { BuildProjectJobInterface } from '~/api/interfaces/shared/jobs';
import { spawn, spawnSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import { resolve as pResolve, join, normalize, isAbsolute } from 'path';
import _env from '../../api/env';

const pathRes = (p: string | string[]): string => {
  if (typeof p === 'string') return normalize(pResolve(p));
  return normalize(pResolve(join(...p)));
};

agenda.define<BuildProjectJobInterface>('build', async (job) => {
  const { buildSteps, output, id, version, runtimeSteps } = job.attrs.data;

  if (buildSteps.length === 0) return;

  const handle = setInterval(() => {
    job.save();
  }, 1000);

  let cwd = __dirname;
  const env: Record<string, any> = { ..._env };

  const pushStdout = (data: string | Buffer, appendToken = false) => {
    if (typeof data !== 'string' && !((data as any) instanceof Buffer)) return;
    if (data.toString) data = data.toString('utf-8');
    const token = env.USER === 'root' ? '#' : '$';

    console.log(appendToken ? token + ' ' + data : data);

    (data as string)
      .split('\\n')
      .forEach((line) => job.attrs.data.stdout.push(line));
  };

  for (let i = 0; i < buildSteps.length; i++) {
    const step = buildSteps[i];
    try {
      await new Promise((res, rej) => {
        const [cmd, ...args] = step
          .split(' ')
          .map((v) => v.trim())
          .filter((v) => v);

        pushStdout(step, true);

        switch (cmd) {
          case 'cd':
            if (!args[0]) cwd = pathRes(['/home/', env.USER]);
            else if (isAbsolute(pathRes(args[0]))) {
              cwd = normalize(pathRes(args[0]));
            } else {
              cwd = pathRes([cwd, args[0]]);
            }
            return res(null);

          case 'set':
            const [variable, value] = args[0].split('=');
            env[variable] = value;
            return res(null);

          default:
            let lastError = '';
            let exited = false;

            const exit = () => {
              if (!exited) {
                exited = true;

                if (proc.exitCode === 0) res(null);
                rej(
                  lastError || 'Exited with code ' + proc.exitCode?.toString(),
                );
              }
            };
            const proc = spawn(cmd, args || [], {
              encoding: 'utf-8',
              cwd,
              detached: true,
              shell: true,
            } as Parameters<typeof spawn>[2])
              .on('close', exit)
              .on('error', rej)
              .on('exit', exit);

            proc.stdout?.on('data', pushStdout);

            proc.stderr?.on('data', (err: Buffer) => {
              lastError += err.toString('utf-8');
              pushStdout(err);
            });
        }
      });
    } catch (er) {
      console.error('Error: ', er);
      console.error('CWD: ', cwd);

      clearInterval(handle);
      await job.save();
      job.fail(er);
      return;
    }
  }

  await job.save();
  clearInterval(handle);

  if (!existsSync(pathRes(output))) {
    job.fail(`Path to output (${output}) is not valid`);
    return;
  }

  try {
    writeFileSync(
      pathRes([output, `verter-runner.sh`]),
      ['#!/bin/sh', '', ...runtimeSteps].join('\\n'),
    );
  } catch (er) {
    console.error("Couldn't write runner file", er);
    return;
  }

  try {
    spawnSync('zip', [`${id}@${version}.zip`, pathRes(output)], {
      cwd: pathRes([_env.VERTER_STORAGE, 'versions']),
    });
  } catch (er) {
    console.error("Couldn't zip output file/folder", er);
    return;
  }

  pushStdout('Processing complete');
});
