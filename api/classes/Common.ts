import { isArray } from 'lodash';
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
      query: Partial<ModelInterface & MongoDocument>,
    ): Promise<(ModelInterface & MongoDocument)[]> {
      return model.find(query as any).exec();
    }

    public async insert(
      query:
        | Partial<ModelInterface & MongoDocument>
        | Partial<ModelInterface & MongoDocument>[],
    ): Promise<void> {
      if (!isArray(query)) query = [query];
      await mongoDb.collection(collection).insertMany(query);
    }
  }

  return Common;
};
