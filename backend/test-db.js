import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/user.model.js";

dotenv.config();

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
    console.log(`MongoDB connected: ${conn.connection.host}`);
    
    console.log("Attempting to find one user...");
    const user = await User.findOne({});
    console.log("Query successful. User found:", user ? "Yes" : "No");

    process.exit(0);
  } catch (error) {
    console.log("MongoDB connection/query error:", error);
    process.exit(1);
  }
};

connectDB();
