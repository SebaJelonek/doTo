import mongoose from 'mongoose';

const connect = async () => {
  if (process.env.MONGO_URI !== undefined) {
    try {
      await mongoose.connect(process.env.MONGO_URI, () => {
        console.log('connected');
      });
    } catch (error) {
      console.log(error);
    }
  } else console.log('.env file does not exist');
};

export default connect;
