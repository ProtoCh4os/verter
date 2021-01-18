import consola from 'consola';

export default {
  info(data: any, ...args: any[]) {
    consola.info(data, args);
  },
  error(data: any, ...args: any[]) {
    consola.error(data, args);
  },
};
