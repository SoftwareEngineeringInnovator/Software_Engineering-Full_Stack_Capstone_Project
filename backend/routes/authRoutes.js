import express from "express";
import User from "../models/User.js";

// Create a router for authentication
const router = express.Router();

// POST route - egister a new application user
router.post("/register", async (req, res) => {
  try {
    // Get the registration information sent by the user
    const { name, email, password } = req.body;

    // Check whether an account already exists with this email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create new user.
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // Return the new user's information without returning the password
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error.message);

    res.status(500).json({
      message: "Unable to register user",
    });
  }
});

// Export the router so it can be connected to the Express application
export default router;