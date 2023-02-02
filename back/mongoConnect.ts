import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectToDataBase = async () => {
  let connect: () => void;

  if (
    process.env.NODE_ENV === undefined &&
    process.env.MONGO_URI !== undefined
  ) {
    connect = async () => {
      try {
        process.env.MONGO_URI &&
          (await mongoose.connect(process.env.MONGO_URI, () => {
            console.log('connected to dev version of DB');
          }));
      } catch (error) {
        console.log(error);
      }
    };
  } else if (
    process.env.NODE_ENV !== undefined &&
    process.env.MONGO_URI !== undefined
  ) {
    connect = async () => {
      try {
        process.env.MONGO_URI &&
          (await mongoose.connect(process.env.MONGO_URI, () => {
            console.log('connected to production version of DB');
          }));
      } catch (error) {
        console.log(error);
      }
    };
  } else connect = () => console.log('.env file does not exist');
  connect();
};
