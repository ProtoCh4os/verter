import { Context } from '@nuxt/types';
import { Request } from 'express';

type Params = Context & {
  req: Context['req'] & {
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
      auth?: {
        id: string;
        login: string;
        name: string;
        loggedAt: Date;
      };
    };
  };
};

const middleWare = ({ store, redirect, req, route }: Params) => {
  if (!store.state.session.loggedIn && route.path === '/login') return;
  if (store.state.session.loggedIn) return;
  if (req?.session?.auth) {
    if (!store.state.session.loggedIn)
      store.commit('session/login', req.session.auth);
    return;
  }

  return redirect('/login');
};

export default middleWare;