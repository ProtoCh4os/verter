import { Types } from 'mongoose';
import Project from '../classes/Project';
import {
  ResDetailsProject,
  ResListProject,
  ResNewProject,
} from '../interfaces/shared/project';
import { ProjectModelInterface } from '../models/Project';
import { Schema as AddSchema } from '../validators/project/add';
import { Schema as EditSchema } from '../validators/project/edit';

export async function list(req: Req, res: Res): Promise<Res> {
  const page = req.query.page ? Number(req.query.page) - 1 : 0;
  const { data: projects, count } = await Project.list(page);

  return respondSuccess<ResListProject>(res, { projects, count });
}

export async function add(req: Req<AddSchema>, res: Res): Promise<Res> {
  const {
    description,
    buildCommands,
    outputFolder,
    outputRuntime,
    icon,
  } = req.body;

  const ins = await Project.insert({
    description,
    icon,
    config: {
      buildCommands,
      outputFolder,
      outputRuntime,
    },
    versions: [],
  });
  return respondSuccess<ResNewProject>(res, {
    id: ins.insertedIds[0].toHexString(),
  });
}

export async function edit(req: Req<EditSchema>, res: Res): Promise<Res> {
  const { id } = req.params;
  const {
    description,
    buildCommands,
    outputFolder,
    outputRuntime,
    icon,
  } = req.body;

  const query: Partial<ProjectModelInterface> = {
    description,
    icon,
  };

  if (buildCommands || outputFolder || outputRuntime) {
    (query.config as Partial<ProjectModelInterface['config']>) = {
      buildCommands,
      outputFolder,
      outputRuntime,
    };
  }

  await Project.updateOne(query, { _id: Types.ObjectId(id) });
  return respondSuccess(res);
}

export async function details(req: Req, res: Res): Promise<Res> {
  const { id } = req.params;

  const [project] = await Project.find({ _id: Types.ObjectId(id) });
  if (!project) return respondError(res, 'Project not found', 404);

  return respondSuccess<ResDetailsProject>(res, { project });
}
