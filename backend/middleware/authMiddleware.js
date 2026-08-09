import jwt from "jsonwebtoken";

// Verify a valid authentication token
const authMiddleware = (req, res, next) => {
  
    // Read the Authorization header sent with the request
  const authHeader = req.headers.authorization;

  // Stop the request if an authentication token is missing
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication token required",
    });
  }

  // Get the token
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the private JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store the authenticated user's ID on the request
    req.userId = decoded.userId;

    // Continue to the protected route
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired authentication token",
    });
  }
};

// Export the middleware so it can be connected to the Express application
export default authMiddleware;