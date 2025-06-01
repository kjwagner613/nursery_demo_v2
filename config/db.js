import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`✅ MongoDB Connected: ${mongoose.connection.name}`);
    })
    .catch(err => {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1);
    });
};

export default connectDB;
