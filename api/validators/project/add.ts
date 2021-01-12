import { array, InferType, object, string } from 'yup';
import { validate } from '../common';

const schema = object({
  description: string().required().min(5).max(50),
  icon: string().nullable(),
  outputFolder: string().required(),
  outputRuntime: array(string().required()).required(),
  buildCommands: array(string().required()).required(),
}).required();

export type Schema = InferType<typeof schema>;

export default validate(schema, { at: 'body' });
