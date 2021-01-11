import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosError } from 'axios';
import { Plugin } from '@nuxt/types';
import session from './session';
import { $axios } from '../axios';

const _sdk = (ax: NuxtAxiosInstance) => ({
  session: session(ax),
});

const sdk = _sdk($axios);

export { sdk };

export function handleError(err: any) {
  if ('response' in err) {
    return String((err as AxiosError).response?.data?.error[0]);
  }
  return String(err.message);
}

declare module 'vue/types/vue' {
  interface Vue {
    $sdk: ReturnType<typeof _sdk>;
  }
}

export default (
  { $axios }: { $axios: NuxtAxiosInstance },
  inject: Parameters<Plugin>[1],
) => inject('sdk', _sdk($axios));
