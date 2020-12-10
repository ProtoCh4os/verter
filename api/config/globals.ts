/* eslint-disable no-redeclare */
import _ from 'lodash';
import { Response } from 'express';
import './prototypes';

const _global = global as any;
_global.respondError = (
  res: Res,
  rawError: string | Array<string | any[]> = ['Internal server error'],
  status = 500,
  headers: CommonObject<string> = {},
): Response | void => {
  if (!res.headersSent) {
    if (!_.isEmpty(headers))
      _.toPairs(headers).forEach(([key, value]) => res.setHeader(key, value));

    return res.status(status).json({
      success: false,
      error: typeof rawError === 'string' ? [rawError] : rawError,
    });
  }
};

_global.respondSuccess = (
  res: Res,
  message: string | number | CommonObject = 'Operation successful',
  status = 200,
  headers: CommonObject<string> = {},
): Response | void => {
  if (!res.headersSent) {
    res.locals.audit = true;

    if (!_.isEmpty(headers))
      _.toPairs(headers).forEach(([key, value]) => res.setHeader(key, value));

    res.body = {
      success: true,
      ...(['string', 'boolean', 'number'].includes(typeof message)
        ? { message }
        : { payload: message }),
    };

    return res.status(status).json(res.body);
  }
};

_global.respondFile = (
  res: Res,
  content: any,
  type = 'image/png',
  status = 200,
  headers: CommonObject<string> = {},
): void => {
  if (!res.headersSent) {
    if (!_.isEmpty(headers))
      _.toPairs(headers).forEach(([key, value]) => res.setHeader(key, value));

    return res
      .header('Content-Type', type)
      .status(status)
      .end(content, 'binary');
  }
};

_global.respondPage = (
  res: Res,
  content: string,
  status = 200,
  headers: CommonObject<string> = {},
): void => {
  res.setHeader('Content-Type', 'text/html');
  if (!res.headersSent) {
    if (!_.isEmpty(headers))
      _.toPairs(headers).forEach(([key, value]) => res.setHeader(key, value));
    res.status(status).send(content);
  }
};

_global.sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const sanitizeObject = <T extends Record<string, any> | Record<string, any>[]>(
  obj: T,
  depth = 0,
): Partial<T> | Partial<T>[] =>
  _.isArray(obj)
    ? obj.map<T>(sanitizeObject as any)
    : _.toPairs(obj).reduce((acc, [ind, val]) => {
        if (depth > 15) return acc;
        if (val === undefined) return acc;
        if (_.isArray(val)) return { ...acc, [ind]: val.map(sanitizeObject) };
        if (val instanceof Date) return { ...acc, [ind]: val.toISOString() };
        if (_.isObject(val))
          return { ...acc, [ind]: sanitizeObject(val, depth + 1) };
        return { ...acc, [ind]: val };
      }, {} as Partial<T>);

_global.sanitizeObject = sanitizeObject;

_global.toString = (arg?: any): string => {
  if (arg === undefined) return '';
  return String(arg);
};

_global.isThenable = (arg: any): arg is Promise<any> => {
  if (arg.then) return true;
  return false;
};
