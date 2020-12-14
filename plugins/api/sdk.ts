import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Plugin } from '@nuxt/types';
import session from './session';

const sdk = (ax: NuxtAxiosInstance) => ({
  session: session(ax),
});

declare module 'vue/types/vue' {
  interface Vue {
    $sdk: ReturnType<typeof sdk>;
  }
}

export default (
  { $axios }: { $axios: NuxtAxiosInstance },
  inject: Parameters<Plugin>[1],
) => {
  if (!process.env.BASE_URL) {
    // $axios.setBaseURL(`${location.origin}api`);
  }

  return inject('sdk', sdk($axios));
};
