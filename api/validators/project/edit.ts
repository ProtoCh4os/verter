import { array, InferType, object, string } from 'yup';
import { validate } from '../common';

const schema = object({
  description: string().min(5).max(50),
  icon: string().nullable(),
  outputFolder: string(),
  outputRuntime: array(string().required()),
  buildCommands: array(string().required()),
}).required();

export type Schema = InferType<typeof schema>;

export default validate(schema, { at: 'body' });
