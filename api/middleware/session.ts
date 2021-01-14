export default (req: Req, res: Res, next: Next): Res | void => {
  if (!req.session || !req.session.auth)
    return respondError(res, 'Unauthorized', 401);
  return next();
};
