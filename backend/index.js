import dotenv from "dotenv";
import express from "express";

// Load the environment variables from the .env file
dotenv.config();

// Create the Express application
const app = express();

// The port where the backend server will run
const PORT = 3000;

// Test route for the backend
app.get("/", (req, res) => {
  res.send("Cybersecurity Incident Tracker API is running");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});