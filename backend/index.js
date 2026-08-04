import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

// Load the environment variables from the .env file
dotenv.config();

// Create the Express application
const app = express();

// Use the port variable from .env
const PORT = process.env.PORT;

// Test route for the backend
app.get("/", (req, res) => {
  res.send("Cybersecurity Incident Tracker API is running");
});

// Connect Backend server to MongoDB
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();

// Replaced by aboved MongoDB connection
// startServer();
// Start the server
// app.listen(PORT, () => {
  // console.log(`Server is running on http://localhost:${PORT}`);
// });