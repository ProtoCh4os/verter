import { LoginResBody } from '~/interfaces/login';

export async function login(_req: Req, res: Res): Promise<Res> {
  return respondSuccess<LoginResBody>(res, { id: 'aa', token: 'dajsd' });
}

export default exports;
