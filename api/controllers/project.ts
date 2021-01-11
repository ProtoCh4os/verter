import Project from '../classes/Project';

export async function list(req: Req, res: Res): Promise<Res> {
  const page = req.query.page ? Number(req.query.page) - 1 : 0;
  const { data: projects, count } = await Project.list(page);

  return respondSuccess(res, { projects, count });
}

export async function add(req: Req, res: Res): Promise<Res> {
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

export async function edit(_req: Req, res: Res): Promise<Res> {
  return respondError(res);
}

export async function del(_req: Req, res: Res): Promise<Res> {
  return respondError(res);
}

export async function details(_req: Req, res: Res): Promise<Res> {
  return respondError(res);
}
