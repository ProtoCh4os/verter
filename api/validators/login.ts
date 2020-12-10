import { object, string } from 'yup';
import { validate } from './common';

const schema = object({
  user: string().required(),
  pass: string().required(),
}).required();

export default validate(schema, { at: 'body' });
