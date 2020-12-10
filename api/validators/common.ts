import { ObjectSchema, ValidationError } from 'yup';

type ValidateOptions = {
  /**
   * Only validate the input, and skip and coercion or transformation. Default - false
   */
  strict?: boolean;
  /**
   * Return from validation methods on the first error rather than after all validations run. Default - true
   */
  abortEarly?: boolean;
  /**
   * Remove unspecified keys from objects. Default - false
   */
  stripUnknown?: boolean;
  /**
   * When false validations will not descend into nested schema (relevant for objects or arrays). Default - true
   */
  recursive?: boolean;
  /**
   * Any context needed for validating schema conditions (see: when())
   */
  context?: object;
};

export const validate = (
  schema: ObjectSchema<any>,
  options: {
    at: 'body' | 'params' | 'query';
    context?: ValidateOptions;
    stripUnknown?: boolean;
  } = { at: 'body', context: {}, stripUnknown: true },
) => {
  return async (req: Req, res: Res, next: Next): Promise<void | Res> => {
    const { at, context, stripUnknown } = options;
    try {
      req[at] = (await schema.validate(req[at], {
        stripUnknown,
        abortEarly: false,
        context: { obj: req[at] },
        ...context,
      })) as any;
      return next();
    } catch (err) {
      return respondBadInput(res, err);
    }
  };
};

export const respondBadInput = (res: Res, err: any): Res => {
  if (err instanceof ValidationError) {
    return respondError(res, err.errors, 400);
  }

  return respondError(res, ['Erro de input'], 400);
};
