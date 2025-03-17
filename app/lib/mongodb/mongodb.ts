import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be defined");
}

let isConnected = false;

export const connectMongoDB = async () => {
  if (isConnected) {
    // console.log("Using existing MongoDB connection");
    return;
  }
  try {
    const { connection } = await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 50, // Set a connection pool limit
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });
    isConnected = connection.readyState === 1;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};