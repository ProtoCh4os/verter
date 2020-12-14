import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import mongooseConnection from './api/services/mongo';
import mongo from 'connect-mongo';

export default {
  target: 'server',

  axios: {
    baseURL: 'google.com',
  },

  head: {
    titleTemplate: '%s - D-ops',
    title: 'D-ops',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['./assets/variables.scss'],

  plugins: [{ src: '~/plugins/api/sdk', mode: 'client' }],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    [
      '@nuxtjs/dotenv',
      {
        only: ['BASE_URL'],
      },
    ],
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxt/http',
    [
      'nuxt-session',
      (session) => {
        const MongoStore = mongo(session);
        return {
          name: 'session',
          secret: process.env.JWT_TOKEN || '414b4c565c84df80263415c3c43fb5de',
          store: new MongoStore({
            mongooseConnection,
          }),
        };
      },
    ],
  ],

  telemetry: false,

  serverMiddleware: [{ path: '/api', handler: '~/api/index.ts' }],

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
  },

  router: {
    middleware: ['session'],
  },

  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }
      if (!config.resolve) {
        config.resolve = {};
      }
      if (!config.resolve.plugins) {
        config.resolve.plugins = [];
      }
      config.resolve.plugins.push(
        new TsconfigPathsPlugin({ configFile: './tsconfig.json' }),
      );
    },
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: `${process.env.BASE_URL || ''}/api`,
    },
  },
};
