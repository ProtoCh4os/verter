import { ResBody } from '~/api/interfaces/shared/common';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { VersionTypes } from '~/api/interfaces/common';
import { AxiosError } from 'axios';

export default (instance: NuxtAxiosInstance) => ({
  add: async (
    projectId: string,
    data?: {
      type: VersionTypes;
      changelog: string;
      nickname?: string;
    },
  ): Promise<ResBody<{ version: string }>> => {
    try {
      const req = await instance.put<ResBody<{ version: string }>>(
        '/project/' + projectId + '/version',
        data
          ? {
              type: data.type,
              changelog: data.changelog,
              nickname: data.nickname,
            }
          : {
              type: 'major',
              changelog: '1.0.0',
            },
      );

      return req.data;
    } catch (err) {
      return (err as AxiosError).response?.data as any;
    }
  },
});
