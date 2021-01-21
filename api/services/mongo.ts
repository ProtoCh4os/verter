import env from '../env';
import mongoose from 'mongoose';
import { config } from 'dotenv';

if (!env) {
  config();
}

mongoose.connect(`mongodb://${env?.VERTER_MONGO_HOST || process.env.VERTER_MONGO_HOST}`, {
  user: env?.VERTER_MONGO_USER || process.env.VERTER_MONGO_USER,
  pass: env?.VERTER_MONGO_PASS || process.env.VERTER_MONGO_PASS,
  useUnifiedTopology: false,
  useNewUrlParser: true,
  connectTimeoutMS: 60000,
  socketTimeoutMS: 60000,
});

mongoose.set('useFindAndModify', false);
mongoose.connection.on('error', function (err) {
  throw new Error(`connection to mongo failed ${err}`);
});

export default mongoose.connection.useDb(
  env?.VERTER_MONGO_DB || process.env.VERTER_MONGO_DB || 'verter',
);
