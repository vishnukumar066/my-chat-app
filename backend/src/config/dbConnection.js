import mongoose from "mongoose";
import { ENV } from "./env.js";

if (!ENV.MONGO_URI) {
  throw new Error("Please provide MONGO_URI in .env file.")
}

const dbConnection = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Server is connected to database successfully.");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

export default dbConnection;
