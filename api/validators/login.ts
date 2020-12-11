import { InferType, object, string } from 'yup';
import { validate } from './common';

const schema = object({
  user: string().required(),
  pass: string().required(),
}).required();

export type Schema = InferType<typeof schema>;

export default validate(schema, { at: 'body' });
