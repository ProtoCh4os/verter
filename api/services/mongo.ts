import mongoose from 'mongoose';
import env from '../env';

mongoose.connect(`mongodb://${env.MONGODB_HOST}`, {
  user: env.MONGODB_USER,
  pass: env.MONGODB_PASS,
  useUnifiedTopology: false,
  useNewUrlParser: true,
  connectTimeoutMS: 60000,
  socketTimeoutMS: 60000,
});

mongoose.set('useFindAndModify', false);
mongoose.connection.on('error', function (err) {
  throw new Error(`connection to mongo failed ${err}`);
});

export default mongoose.connection.useDb(env.MONGODB_DB);
