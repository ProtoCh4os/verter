/* eslint-disable no-loop-func */
import config from 'config';
import { lstat, readFile, copyFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { prompt } from 'inquirer';
import { Spinner } from 'clui';

async function configureApi(): Promise<void> {
  const spin = new Spinner('Validando');

  const { newApiPath, apiEnv } = await prompt([
    {
      name: 'newApiPath',
      type: 'input',
      message: 'Digite o caminho para o diretório da API',
      default: config.get('paths.api') || process.env.HOME || '',
      validate: async (newApiPath): Promise<true | string> => {
        spin.start();
        try {
          const exists = await lstat(newApiPath);
          if (!exists.isDirectory()) {
            spin.stop();
            return 'O caminho fornecido não é um diretório';
          }

          const packageFile = await lstat(resolve(newApiPath, 'package.json'));

          if (!packageFile.isFile()) {
            spin.stop();
            return 'O caminho fornecido não é o projeto Xpro API';
          }

          const packageData = await readFile(
            resolve(newApiPath, 'package.json'),
            {
              encoding: 'utf-8',
            },
          );

          if (!/"name": "xpro-server",/.test(packageData)) {
            spin.stop();
            return 'O caminho fornecido não é o projeto Xpro API';
          }

          spin.stop();
          return true;
        } catch (err) {
          spin.stop();
          return 'O caminho fornecido não é válido';
        }
      },
    },
    {
      name: 'apiEnv',
      type: 'list',
      message: 'Qual o ambiente da API?',
      choices: ['prod', 'demo', 'develop'],
      default: config.get('envs.api') || 'develop',
    },
  ]);

  try {
    await lstat(resolve(newApiPath, '.env'));
  } catch (err) {
    await copyFile(
      resolve(newApiPath, '.env.example'),
      resolve(newApiPath, '.env'),
    );
  }

  const editorData = await readFile(resolve(newApiPath, '.env'), {
    encoding: 'utf-8',
  });

  const { newEnv } = await prompt([
    {
      name: 'newEnv',
      type: 'editor',
      default: editorData,
      message: 'Digite os parâmetros de ambiente da API',
    },
  ]);

  await writeFile(resolve(newApiPath, '.env'), newEnv, {
    encoding: 'utf-8',
  });

  config.set('paths.api', newApiPath);
  config.set('envs.api', apiEnv);
  say('Configurações salvas com sucesso!');
}

export default async (): Promise<void> => {
  let exit = false;

  while (!exit) {
    const { operation } = await prompt([
      {
        name: 'operation',
        message: 'Configurações',
        choices: ['API', 'Web', 'Docs', 'Editor', 'Sair'],
        type: 'list',
      },
    ]);

    switch (operation) {
      case 'API':
        await configureApi();
        break;
      case 'Sair':
        exit = true;
        break;
      default:
        exit = true;
    }
  }
};
