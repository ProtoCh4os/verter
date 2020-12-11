import fs from 'fs';
import p from 'path';
import dotenv from 'dotenv';
import { string, object, InferType } from 'yup';

const schema = object({
  // BASE
  NODE_ENV: string()
    .required()
    .oneOf(['test', 'development', 'production', 'staging']),
  JWT_TOKEN: string().required(),
  MONGODB_HOST: string().required(),
  MONGODB_DB: string().required(),
  MONGODB_USER: string(),
  MONGODB_PASS: string(),
}).required();

const filename = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

const loc = fs.existsSync(p.join(__dirname, `../${filename}`))
  ? `../${filename}`
  : filename;

const path = p.join(__dirname, loc);

dotenv.config({
  path,
});

// eslint-disable-next-line import/no-mutable-exports
let env: InferType<typeof schema>;

if (process.env.NODE_ENV !== 'test') {
  env = schema.validateSync(process.env, {
    abortEarly: true,
  });
} else env = (process.env as any) as typeof env;

export default env as InferType<typeof schema>;
