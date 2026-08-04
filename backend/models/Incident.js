import mongoose from "mongoose";

// Define the structure of a cybersecurity incident
const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Low",
      index: true,
    },

    category: {
      type: String,
      enum: [
        "Malware",
        "Phishing",
        "Unauthorized Access",
        "Data Exposure",
        "Network Attack",
        "Other",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: ["Open", "Investigating", "Contained", "Resolved"],
      default: "Open",
      index: true,
    },

    affectedSystem: {
      type: String,
      required: true,
      trim: true,
    },

    reportedBy: {
      type: String,
      required: true,
      trim: true,
    },

    assignedTo: {
      type: String,
      default: "Unassigned",
      trim: true,
    },

    resolutionNotes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Incident model
const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;