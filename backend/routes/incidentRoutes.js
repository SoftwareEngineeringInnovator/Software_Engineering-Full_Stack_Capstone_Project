import express from "express";
import Incident from "../models/Incident.js";

// Create an Express router for incident-related routes
const router = express.Router();

// GET route /api/incidents
router.get("/", async (req, res) => {
    try {
        const incidents = await Incident.find();

        // Return a 200 response when unable to retrieve an incident
        res.status(200).json(incidents);
    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve incidents",
            error: error.message,
        });
    }
});

// GET route /api/incidents/:id - retrieve incident using its MongoDB ID
router.get("/:id", async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);

        // Message if the ID is not found
        if (!incident) {
            return res.status(404).json({
                message: "Incident not found",
            });
        }

        res.status(200).json(incident);
    } catch (error) {

        // Return a 400 response when ID format is invalid
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid incident ID",
            });
        }

        res.status(500).json({
            message: "Unable to retrieve incident",
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

// DELETE route /api/incidents/:id - delete an incident using its ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedIncident = await Incident.findByIdAndDelete(req.params.id);

        // Return a 400 response if the incident is not found
        if (!deletedIncident) {
            return res.status(404).json({
                message: "Incident not found",
            });
        }

        // Return a 200 response when incident gets deleted successfully
        res.status(200).json({
            message: "Incident deleted successfully",
            incident: deletedIncident,
        });
    } catch (error) {
        // Return a 400 response when the ID format is invalid
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid incident ID",
            });
        }

        // Return a 500 response when the process is unable to delete an incident
        res.status(500).json({
            message: "Unable to delete incident",
            error: error.message,
        });
    }
});

export default router;