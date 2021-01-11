import 'express';

declare module 'express' {
  export interface Request {
    audited?: boolean;
    session: {
      id: string;
      cookies: {
        originalMaxAge: string;
        path: string;
        domain: undefined;
        expires: Date;
        httpOnly: boolean;
        sameSite: undefined;
        secure: undefined;
      };
      req: Request;
      save: Function;
      auth: {
        id: string;
        login: string;
        name: string;
        loggedAt: Date | string;
      };
    };
  }

  export interface Response {
    body?: any;
    locals: {
      [key: string]: any;
    };
  }
}
