import { ServerMiddleware } from '@nuxt/types';
import app from './app';

const myServerMiddleware: ServerMiddleware = app.app;

export default myServerMiddleware;
