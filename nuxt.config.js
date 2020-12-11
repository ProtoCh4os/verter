import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { config } from 'dotenv';

config();

export default {
  target: 'server',
  env: process.env,
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

  plugins: ['~/plugins/api/sdk'],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],

  modules: [
    '@nuxtjs/axios',
    '@nuxt/http',
    [
      'nuxt-session',
      {
        name: 'session',
        secret: process.env.JWT_TOKEN || '414b4c565c84df80263415c3c43fb5de',
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
};
