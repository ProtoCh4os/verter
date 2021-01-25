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
  Router,
} from 'express';
import { isObject, toPairs } from 'lodash';
import { ValidationError } from 'yup';
import routes from './routes';
import logger from './services/logger';

class App {
  public app: Application;

  public server!: Server;

  public api: Router;

  public constructor() {
    this.app = express();
    this.api = Router();
    this.middlewares();
    this.routes();

    this.build();
  }

  private build(): void {
    this.app.use(this.api);
    this.server = http.createServer(this.app);
  }

  private middlewares(): void {
    this.api.use(json());
    this.api.use(urlencoded({ extended: true }));
    this.api.use(helmet());
  }

  private routes(): void {
    this.api.use(this.decode);

    this.api.use(routes);

    this.api.use(this.errorHandler);
    this.api.use(this.routeNotFound);
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
