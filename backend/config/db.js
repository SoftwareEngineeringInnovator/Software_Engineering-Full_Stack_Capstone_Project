import mongoose from "mongoose";

// Connects the backend application to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    // Stop the application if it cannot connect to the database
    process.exit(1);
  }
};

export default connectDB;