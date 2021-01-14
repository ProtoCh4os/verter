import fs from 'fs';
import p from 'path';
import dotenv from 'dotenv';
import { string, object } from 'yup';

const schema = object({
  // BASE
  SESSION_KEY: string().required(),
  MONGODB_HOST: string().required(),
  MONGODB_DB: string().required(),
  MONGODB_USER: string(),
  MONGODB_PASS: string(),
}).required();

const loc = fs.existsSync(p.join(__dirname, `../.env`)) ? `../.env` : '.env';

const path = p.join(__dirname, loc);

dotenv.config({
  path,
});

// eslint-disable-next-line import/no-mutable-exports
const env = schema.validateSync(process.env, {
  abortEarly: true,
});

export default env;
