import startup from '../utils/startup';
import { ServerMiddleware } from '@nuxt/types';
import app from './app';

startup();

const myServerMiddleware: ServerMiddleware = app.app;
export { app };

export default myServerMiddleware;
