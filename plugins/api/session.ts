import { LoginResBody } from '../../interfaces/login';
import { ResBody } from '../../interfaces/common';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

export default (instance: NuxtAxiosInstance) => ({
  login: async (user: string, pass: string): Promise<LoginResBody | false> => {
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
  },
  logout: async (): Promise<void> => {
    try {
      await instance.post('/session/logout');
    } catch (err) {}
  },
});
