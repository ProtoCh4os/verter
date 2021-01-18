import 'express-async-errors';
import './config/globals';
import http, { Server } from 'http';
import helmet from 'helmet';
import express, {
  json,
  urlencoded,
  Response,
  Request,
  Application,
} from 'express';
import { isObject, toPairs } from 'lodash';
import { ValidationError } from 'yup';
import routes from './routes';
import logger from './services/logger';

class App {
  public app: Application;

  public server!: Server;

  public constructor() {
    this.app = express();
    this.middlewares();
    this.routes();

    this.build();
  }

  private build(): void {
    this.server = http.createServer(this.app);
  }

  private middlewares(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(helmet());
  }

  private routes(): void {
    this.app.use(this.decode);

    this.app.use(routes);

    this.app.use(this.errorHandler);
    this.app.use(this.routeNotFound);
  }

  private decode(req: Req, _res: Res, next: Next): void {
    if (req.url) req.url = decodeURI(req.url);

    if (req.params && isObject(req.params)) {
      const newObj: CommonObject = {};
      toPairs(req.params).forEach(([key, value]) => {
        newObj[key] = decodeURI(value);
      });
      req.params = newObj;
    }
    return next();
  }

  private errorHandler(
    err: Error | ValidationError,
    req: Request,
    res: Response,
    _next: Next,
  ): Response | void {
    if (err instanceof SyntaxError && 'body' in err && !res.headersSent)
      return respondError(res, 'Invalid JSON data', 400);
    if (err instanceof ValidationError)
      return respondError(res, err.errors, 400);

    logger.error(err, req.originalUrl);

    return respondError(res);
  }

  private routeNotFound(_req: Request, res: Response): Response {
    return respondError(res, 'Route not found', 404);
  }
}

export default new App();
