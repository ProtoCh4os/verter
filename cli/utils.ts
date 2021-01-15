/* eslint-disable no-console */
import chalk, { Color } from 'chalk';

export const say = (words: string, color: typeof Color = 'blueBright'): void =>
  console.log(chalk[color](words));

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
