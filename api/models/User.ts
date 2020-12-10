import { Schema } from 'mongoose';

export type UserModelInterface = {
  username: string;
  password: string;
  salt: string;
  name: string;
  lastLogin: string;
};

export const UserModel = new Schema<UserModelInterface>({
  username: String,
  password: String,
  salt: String,
  name: String,
  lastLogin: String,
});
