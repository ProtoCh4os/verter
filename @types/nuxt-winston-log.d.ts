import '@nuxt/types';

declare module '@nuxt/types' {
  export interface Context {
    $winstonLog: {
      info(data: any): void;
      error(data: any): void;
    };
  }
}
