import { UserModelInterface, UserModel } from '../models/User';
import Common from './Common';

export default class User extends Common<UserModelInterface>(
  UserModel,
  'users',
) {}
