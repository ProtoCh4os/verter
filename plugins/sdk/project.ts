import { ResBody } from '~/api/interfaces/shared/common';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ResListProject, ResNewProject } from '~/api/interfaces/shared/project';
import { Schema } from '~/api/validators/project/add';

export default (instance: NuxtAxiosInstance) => ({
  add: async (form: Schema): Promise<ResNewProject | false> => {
    try {
      const req = await instance.put<ResBody<ResNewProject>>('/project/', form);

      const { data } = req;

      if (data.success) {
        return data.payload;
      }
      return false;
    } catch (err) {
      return false;
    }
  },
  edit: async (id: string, form: Schema): Promise<boolean> => {
    try {
      const req = await instance.post<ResBody<any>>('/project/' + id, form);

      const { data } = req;

      return data.success;
    } catch (err) {
      return false;
    }
  },
  list: async (page = 1): Promise<ResListProject> => {
    if (page <= 0) return { projects: [], count: 0 };
    try {
      const req = await instance.get<ResBody<ResListProject>>('/project', {
        params: { page },
      });

      const { data } = req;

      if (data.success) {
        return data.payload;
      }
      return { projects: [], count: 0 };
    } catch (err) {
      return { projects: [], count: 0 };
    }
  },
});
