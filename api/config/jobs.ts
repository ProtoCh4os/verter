import env from '../env';
import { config } from 'dotenv';
import Agenda from 'agenda';

if (!env) config();

export default new Agenda({
  db: {
    address: `mongodb://${process.env.VERTER_MONGO_HOST || '127.0.0.1:27017'}/${
      process.env.VERTER_MONGO_DB || 'verter'
    }`,
    collection: 'jobs',
  },
});
