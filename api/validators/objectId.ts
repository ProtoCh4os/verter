import { validate } from './common';
import { object, string } from 'yup';
import { Types } from 'mongoose';

export default (at: 'body' | 'params' | 'query', field: string) =>
  validate(
    object({
      [field]: string().test('object-id', 'ID inválido', (val) =>
        Boolean(val && Types.ObjectId.isValid(val)),
      ),
    }).required(),
    {
      at,
    },
  );
