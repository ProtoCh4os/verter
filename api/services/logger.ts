/* eslint-disable no-console */
import { createLogger, format, transports, Logger } from 'winston';
import env from '../env';

const { combine, timestamp, prettyPrint, errors, json, printf, splat } = format;
let logger: Logger;

if (env.NODE_ENV === 'production') {
  logger = createLogger({
    format: combine(
      timestamp(),
      errors({ stack: true }),
      splat(),
      printf(JSON.stringify),
    ),
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
    ],
  });
} else {
  logger = createLogger({
    format: combine(
      json(),
      errors({ stack: true }),
      timestamp(),
      prettyPrint(),
    ),
    transports: [new transports.Console()],
  });
}

const formatData = (
  data: string | CommonObject | Error,
  url?: string,
): string => {
  if (typeof data === 'string') {
    return data + (url ? `&requestUrl=${url}` : '');
  }

  if (data instanceof Error) {
    return JSON.stringify({ message: data.message, requestUrl: url });
  }

  try {
    if (JSON.stringify(data) === '{}') return data.toString();
    return JSON.stringify({ ...data, requestUrl: url });
  } catch (err) {
    return toString(data);
  }
};

const isDebugging = process.features.inspector && env.NODE_ENV !== 'production';

const loggerTool = {
  info: (data: string | CommonObject | Error, req?: Req): void => {
    const formatedData = formatData(data, req?.originalUrl);
    const printData = {
      level: 'info',
      message: formatedData,
    };

    if (isDebugging)
      console.log({
        level: 'info',
        message:
          typeof data === 'string' ? formatedData : JSON.parse(formatedData),
      });
    else logger.log(printData);
  },
  error: (data: Error, req?: Req | string): void => {
    const formatedData = formatData(
      data,
      typeof req === 'string' ? req : req?.originalUrl,
    );
    const printData = {
      level: 'error',
      message: formatedData,
      stack: data.stack,
    };

    if (isDebugging)
      console.log({
        ...data,
        stack: data.stack,
        name: data.name,
        meta: JSON.parse(formatedData),
      });
    else logger.log(printData);
  },
};

export default loggerTool;
