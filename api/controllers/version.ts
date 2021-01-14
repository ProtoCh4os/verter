import { Types } from 'mongoose';
import Project from '../classes/Project';
import { Schema } from '../validators/project/version/add';

export async function add(req: Req<Schema>, res: Res): Promise<Res> {
  const { id: projectId } = req.params;

  const [[project], lastVersion] = await Promise.all([
    Project.find({
      _id: Types.ObjectId(projectId),
    }),
    Project.getLastVersion(projectId),
  ]);

  if (!project) return respondError(res, 'Project not found', 404);

  if (!lastVersion) {
    await Project.newVersion({
      projectId,
      changelog: `${project.toObject().description} v1.0.0`,
      major: 1,
      minor: 0,
      patch: 0,
    });
    return respondSuccess(res, { version: '1.0.0' });
  }

  const { type, nickname, changelog } = req.body;
  let { major, minor, patch } = lastVersion;

  switch (type) {
    case 'major':
      major++;
      minor = 0;
      patch = 0;
      break;
    case 'minor':
      minor++;
      patch = 0;
      break;
    case 'patch':
      patch++;
      break;
  }

  await Project.newVersion({
    projectId,
    major,
    minor,
    patch,
    changelog,
    nickname: type === 'major' ? nickname : lastVersion.versionId,
  });

  return respondSuccess(res, { version: [major, minor, patch].join('.') });
}
