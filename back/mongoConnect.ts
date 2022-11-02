import mongoose from 'mongoose';
import { config } from 'dotenv';

const env = config();
console.log(env.parsed?.MONGO_URI);

const connect = async () => {
  if (env.parsed !== undefined) {
    try {
      await mongoose.connect(env.parsed.MONGO_URI, () => {
        console.log('connected');
      });
    } catch (error) {
      console.log(error);
    }
  } else console.log('.env file does not exist');
};

export default connect;
