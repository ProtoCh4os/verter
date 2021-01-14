import { object, string } from 'yup';
import { VersionTypes } from '~/api/interfaces/common';
import { validate } from '../../common';

const schema = object({
  type: string().required().oneOf(['major', 'minor', 'patch']),
  nickname: string().max(20),
  changelog: string().max(300).required(),
}).required();

export type Schema = {
  type: VersionTypes;
  nickname: string;
  changelog: string;
};

export default validate(schema, { at: 'body' });
