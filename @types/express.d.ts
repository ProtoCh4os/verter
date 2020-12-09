import 'express';

declare module 'express' {
  export interface Request {
    audited?: boolean;
  }

  export interface Response {
    body?: any;
    locals: {
      [key: string]: any;
    };
  }
}
