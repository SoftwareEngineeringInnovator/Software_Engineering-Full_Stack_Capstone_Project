import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the information for each application user
const userSchema = new mongoose.Schema(
    {
        // Store the user's name.
        name: {
            type: String,
            required: true,
            trim: true,
        },

        // Store user email address for log in
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        // Store the user's password
        password: {
            type: String,
            required: true,
        },
    },
    {
        // Automatically create createdAt and updatedAt fields
        timestamps: true,
    },
);

// Hash the user's password
userSchema.pre("save", async function () {
    // Do not hash the password if it has not been changed
    if (!this.isModified("password")) {
        return;
    }

    // Replace the plain-text password with password hash
    this.password = await bcrypt.hash(this.password, 10);
});

// Create the User model
const User = mongoose.model("User", userSchema);

// Export the model so it can be used by the authentication routes
export default User;