import { LoginResBody } from '~/interfaces/login';
import User from '../classes/User';
import crypto from '../services/crypt';
import { Schema } from '../validators/login';

export async function login(req: Req<Schema>, res: Res): Promise<Res> {
  const { pass, user } = req.body;
  const results = await User.find({
    username: user,
  });

  if (results.length > 0) {
    const { name, salt, password, _id } = results.first();
    if (crypto.hash(pass, salt) === password) {
      req.session.auth = {
        id: String(_id),
        loggedAt: new Date(),
        login: user,
        name,
      };
      return respondSuccess<LoginResBody>(res, {
        id: String(_id),
        name,
      });
    }
  }

  return respondError(res, 'User not found or incorrect password', 404);
}

export async function logout(req: Req, res: Res): Promise<Res> {
  if (req.session.auth) req.session.auth = undefined;
  return respondSuccess(res);
}

export default exports;
