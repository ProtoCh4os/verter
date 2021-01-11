/* eslint-disable no-use-before-define */
import { Document } from 'mongoose';
import { ParsedQs } from 'qs';
import { ResBody as _ResBody } from '../api/interfaces/shared/common';
import { NextFunction, Request, Response } from 'express';

declare global {
  /**
   * Utility types
   */
  type CommonObject<T = any> = Record<string, T>;

  type RequiredProp<T extends CommonObject, K extends keyof T> = T &
    Required<Pick<T, K>>;

  type Extensible<T, C = any> = T & { [key: string]: C };

  /**
   * Express-related types
   */

  type Res<T = any> = Response<T>;
  type Req<Body = any, Query = ParsedQs> = Request<any, Body, Body, Query>;

  type Next = NextFunction;

  type ResBody<T> = _ResBody<T>;

  /**
   * Mongo-related types
   */

  type MongoDocument = Document;

  /**
   * Functions
   */

  function respondError<T extends string | (string | any[])[]>(
    res: Res<T>,
    rawError?: T,
    status?: number,
    headers?: CommonObject<string>,
  ): Res<T>;

  function respondSuccess<T extends string | number | CommonObject>(
    res: Res<T>,
    message?: T,
    status?: number,
    headers?: CommonObject<string>,
  ): Res<T>;

  function respondFile(
    res: Res,
    content?: any,
    type?: string,
    status?: number,
    headers?: CommonObject<string>,
  ): Res<any>;

  function respondPage(
    res: Res,
    content: string,
    status?: number,
    headers?: CommonObject<string>,
  ): Res<any>;

  function sleep(ms: number): Promise<void>;

  function sanitizeObject<
    T extends Record<string, any> | Record<string, any>[]
  >(obj: T): Partial<T>;

  function toString(arg?: any): string;

  function isThenable(arg: any): arg is Promise<any>;

  /**
   * Prototype extensions
   */

  interface Array<T> {
    /**
     * Returns first item of the array without modifying it.
     *
     * Equivalent to lodash's 'head' function
     */
    first(): T;

    /**
     * Returns last item of the array without modifying it.
     *
     * Equivalent to lodash's 'last' function
     */
    last(): T;
  }

  interface JSON {
    stringify(obj: CommonObject): string;
  }

  interface DateConstructor {
    isValid(date: string): boolean;
  }

  interface Date {
    /**
     * Checks if current Date happened within a time range from the present to an specified time in the past
     * @param diff Time in the past, in milisseconds or ms syntax (e.g.: 5d)
     */
    happenedInPast(diff: string | number): boolean;
  }

  interface String {
    toRegex(): RegExp;
  }
}
