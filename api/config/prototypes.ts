/* eslint-disable no-extend-native */
import _ from 'lodash';
import ms from 'ms';

Array.prototype.first = function (): any {
  return _.head(this);
};
Array.prototype.last = function (): any {
  return _.last(this);
};

const { stringify } = JSON;
JSON.stringify = (obj: CommonObject): string => {
  let cache: any[] | null = [];
  const retVal = stringify(obj, (_key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache?.includes(value)) return undefined;
      return cache?.push(value) && value;
    }
    return value;
  });
  cache = null;
  return retVal;
};

Date.isValid = (date: string): boolean => {
  const dateObj = new Date(date);
  // eslint-disable-next-line no-self-compare
  return dateObj.getTime() === dateObj.getTime();
};

Date.prototype.happenedInPast = function (diff: string | number): boolean {
  const timeAgo = typeof diff === 'string' ? ms(diff) : diff;

  return this.getTime() > new Date().getTime() - timeAgo;
};

String.prototype.toRegex = function (): RegExp {
  return new RegExp(this.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'));
};
