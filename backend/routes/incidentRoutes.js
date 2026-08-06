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

// POST route /api/incidents - create an incident in MongoDB
router.post("/", async (req, res) => {
    try {
        const newIncident = await Incident.create(req.body);

        res.status(201).json(newIncident);
    } catch (error) {
        // Return a 400 response when incident data does not pass validation
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Incident validation failed",
                error: error.message,
            });
        }

        // Display error message 
        res.status(500).json({
            message: "Unable to create incident",
            error: error.message,
        });
    }
});

// PUT route /api/incidents/:id - update incidents in MongoDB
router.put("/:id", async (req, res) => {
    try {

        const updatedIncident = await Incident.findByIdAndUpdate(
            // Gets incident ID
            req.params.id,
            // Contains updated information
            req.body,
            {
                // Returns updated document
                new: true,
                // Validates the schema input
                runValidators: true,
            }
        );
        
        // Message for ID not found
        if (!updatedIncident) {
            return res.status(404).json({
                message: "Incident not found",
            });
        }

        res.status(200).json(updatedIncident);
    } catch (error) {
        // Message for validation error
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Incident validation failed",
                error: error.message,
            });
        }

        // Message for unable to update the incident
        res.status(500).json({
            message: "Unable to update incident",
            error: error.message,
        });
    }
});

export default router;