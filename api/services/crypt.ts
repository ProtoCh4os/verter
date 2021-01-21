import CryptoJS from 'crypto-js';
import jwtwebtoken from 'jsonwebtoken';
import env from '../env';

const defaultData = {
  secret: env.VERTER_SESSION_KEY,
  expiresIn: 3 * 24 * 60 * 60 * 1000,
};

export const generateSalt = (): string => {
  const salt = CryptoJS.lib.WordArray.random(128);
  return CryptoJS.enc.Hex.stringify(salt);
};

export const hash = (payload: string, salt: string): string => {
  return CryptoJS.PBKDF2(payload, salt, 10000, 16, 'SHA512').toString();
};

export const encrypt = (payload: string, key = env.VERTER_SESSION_KEY): string => {
  if (!key) throw new Error('Key not provided');
  return CryptoJS.AES.encrypt(payload, key).toString();
};

export const decrypt = (payload: string, key = env.VERTER_SESSION_KEY): string => {
  if (!key) throw new Error('Key not provided');
  return CryptoJS.AES.decrypt(payload, key).toString(CryptoJS.enc.Utf8);
};

export const jwt = {
  signNoExpire: <T extends string | object | Buffer = any>(
    payload: T,
  ): string => jwtwebtoken.sign(payload, defaultData.secret),
  sign: <T extends string | object | Buffer = any>(
    payload: T,
    expiresIn = defaultData.expiresIn,
  ): string => jwtwebtoken.sign(payload, defaultData.secret, { expiresIn }),
  verify: <T = any>(token: string): T | undefined => {
    let decoded;
    jwtwebtoken.verify(token, defaultData.secret, (err, dec) => {
      if (err) throw err;
      decoded = dec;
    });
    return decoded as T | undefined;
  },
};

export default {
  generateSalt,
  hash,
  encrypt,
  decrypt,
  jwt,
};
