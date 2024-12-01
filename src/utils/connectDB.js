import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.DB_URL) {
    throw new Error("DB URL is required");
  }
  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }

  await mongoose.connect(process.env.DB_URL);
  isConnected = true;
  console.log("Database connected successfully!");
};

export default connectDB;
