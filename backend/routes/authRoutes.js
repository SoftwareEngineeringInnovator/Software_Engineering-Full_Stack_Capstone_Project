import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";

// Create a router for authentication
const router = express.Router();

// POST route - register a new application user
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

// Log in an existing application user
router.post("/login", async (req, res) => {
    try {
        // Get the login information sent by the user
        const { email, password } = req.body;

        // Find the user by email address.
        const user = await User.findOne({ email });

        // Stop the login if the email does not belong to an existing user
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Compare the entered password with the hashed password in MongoDB
        const passwordMatches = await bcrypt.compare(password, user.password);

        // Stop the login if the password does not match
        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Create an authentication token for the successfully logged-in user
        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            },
        );

        // Return user information after a successful login
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error logging in user:", error.message);

        res.status(500).json({
            message: "Unable to log in",
        });
    }
});

// Test that only authenticated users can access the protected route
router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully",
    userId: req.userId,
  });
});

// Export the router so it can be connected to the Express application
export default router;