import { LoginResBody } from '../../interfaces/login';
import { ResBody } from '../../interfaces/common';
import { instance } from './config';

export async function login(
  user: string,
  pass: string,
): Promise<LoginResBody | false> {
  try {
    const req = await instance.post<ResBody<LoginResBody>>('/login', {
      user,
      pass,
    });

    const { data } = req;

    if (data.success) {
      return data.payload;
    }
    return false;
  } catch (err) {
    return false;
  }
}

export default { login };
