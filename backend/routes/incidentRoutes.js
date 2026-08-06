import express from "express";
import Incident from "../models/Incident.js";

// Create an Express router for incident-related routes
const router = express.Router();

// GET route /api/incidents
router.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find();

    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve incidents",
      error: error.message,
    });
  }
});

export default router;