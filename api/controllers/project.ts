import { Types } from 'mongoose';
import Project from '../classes/Project';
import { ProjectModelInterface } from '../models/Project';
import { Schema as AddSchema } from '../validators/project/add';
import { Schema as EditSchema } from '../validators/project/edit';

export async function list(req: Req, res: Res): Promise<Res> {
  const page = req.query.page ? Number(req.query.page) - 1 : 0;
  const { data: projects, count } = await Project.list(page);

  return respondSuccess(res, { projects, count });
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
  return respondSuccess(res, { id: ins.insertedIds[0] });
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

export async function del(_req: Req, res: Res): Promise<Res> {
  return respondError(res);
}

export async function details(_req: Req, res: Res): Promise<Res> {
  return respondError(res);
}
