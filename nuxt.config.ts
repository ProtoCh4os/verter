import { NuxtConfig } from '@nuxt/types';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import mongooseConnection from './api/services/mongo';
import mongo from 'connect-mongo';
import { config } from 'dotenv';

config();

const themeColors = {
  primary: '#47BCFF',
  secondary: '#556F44',
  accent: '#7161EF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
};

const settings: NuxtConfig = {
  target: 'server',

  dev: process.env.VERTER_ENV !== 'production',

  server: {
    port: process.env.VERTER_PORT || 3000,
  },

  head: {
    titleTemplate: '%s - Verter',
    title: 'Verter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['./assets/variables.scss', './assets/base.sass'],

  plugins: [{ src: '~/plugins/sdk' }],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify', '@nuxtjs/dotenv'],

  modules: [
    '@nuxtjs/axios',
    '@nuxt/http',
    [
      'nuxt-session',
      (session: any) => {
        const MongoStore = mongo(session);
        return {
          name: 'session',
          secret: process.env.VERTER_SESSION_KEY,
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
    theme: {
      dark: false,
      themes: {
        dark: themeColors,
        light: themeColors,
      },
    } as any,
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
      baseURL: '/api',
    },
  },
};

export default settings;
