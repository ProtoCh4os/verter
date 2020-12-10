import { Schema } from 'mongoose';
import mongoDb from '../services/mongo';

export default <ModelInterface = any>(schema: Schema, collection: string) => {
  const model = mongoDb.model<ModelInterface & MongoDocument>(
    collection,
    schema,
    collection,
  );

  class Common {
    public static async find(
      query: Partial<ModelInterface>,
    ): Promise<ModelInterface[]> {
      return model.find(query as any).exec();
    }
  }

  return Common;
};
