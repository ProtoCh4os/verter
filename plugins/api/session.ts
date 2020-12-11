import { LoginResBody } from '../../interfaces/login';
import { ResBody } from '../../interfaces/common';
import { instance } from './config';

export async function login(
  user: string,
  pass: string,
): Promise<LoginResBody | false> {
  try {
    const req = await instance.post<ResBody<LoginResBody>>('/session/login', {
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

export async function logout(): Promise<void> {
  try {
    await instance.post('/session/logout');
  } catch (err) {}
}

export default { login, logout };
