import { isArray } from 'lodash';
import { Schema } from 'mongoose';
import {
  InsertWriteOpResult,
  UpdateWriteOpResult,
  DeleteWriteOpResultObject,
} from 'mongodb';
import mongoDb from '../services/mongo';
import { MongoModelInterface } from '../models/common';

export default <ModelInterface extends MongoModelInterface = any>(
  schema: Schema,
  collection: string,
) => {
  const model = mongoDb.model<ModelInterface & MongoDocument>(
    collection,
    schema,
    collection,
  );

  const conn = mongoDb.collection(collection);

  class Common {
    protected static conn = conn;
    protected static model = model;

    public static async find(
      query: Partial<ModelInterface>,
    ): Promise<(ModelInterface & MongoDocument)[]> {
      return model.find(query as any).exec();
    }

    public static async insert(
      query: Partial<ModelInterface> | Partial<ModelInterface>[],
    ): Promise<InsertWriteOpResult<ModelInterface>> {
      if (!isArray(query)) query = [query];
      const res = await conn.insertMany(query);
      return res;
    }

    public static async updateOne(
      query: Partial<ModelInterface>,
      where: Partial<ModelInterface>,
    ): Promise<UpdateWriteOpResult> {
      const res = await conn.updateOne(where, { $set: query });
      return res;
    }

    public static async updateMany(
      query: Partial<ModelInterface>,
      where: Partial<ModelInterface>,
    ): Promise<UpdateWriteOpResult> {
      const res = await conn.updateMany(where, query);
      return res;
    }

    public static async del(
      where: Partial<ModelInterface>,
    ): Promise<DeleteWriteOpResultObject> {
      const res = await conn.deleteMany(where);
      return res;
    }
  }

  return Common;
};
