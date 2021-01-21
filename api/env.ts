import fs from 'fs';
import p from 'path';
import dotenv from 'dotenv';
import { string, object } from 'yup';
import cfg from '../nuxt.config';

const schema = object({
  // BASE
  VERTER_SESSION_KEY: string().required(),
  VERTER_STORAGE: string()
    .required()
    .matches(/[^\0]+/)
    .test(function (val) {
      if (!val)
        return this.createError({ message: 'VERTER_STORAGE is required' });

      if (!p.isAbsolute(val))
        return this.createError({
          message: 'VERTER_STORAGE must be an absolute path',
        });
      return true;
    }),
  // MONGO
  VERTER_MONGO_HOST: string().required(),
  VERTER_MONGO_DB: string().required(),
  VERTER_MONGO_USER: string(),
  VERTER_MONGO_PASS: string(),
}).required();

const findNearestEnvFile = (): string => {
  const calcPath = (previous: string[] = ['..']): string => {
    const path = p.join(__dirname, ...previous, `.env`);

    if (fs.existsSync(path)) return path;

    previous.push('..');
    return calcPath();
  };

  return calcPath();
};

const path = findNearestEnvFile();

dotenv.config({
  path,
});

const env = schema.validateSync(process.env, {
  abortEarly: true,
});

export default {
  ...env,
  VERTER_ENV: cfg?.dev ? 'development' : 'production',
};
