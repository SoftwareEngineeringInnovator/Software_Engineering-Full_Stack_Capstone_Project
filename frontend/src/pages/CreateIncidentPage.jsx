import { useState } from "react";

// This page will allow users to POST/submit a new incident ticket
function CreateIncidentPage() {

    // Store the information the user enters into the incident form
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        severity: "Low",
        category: "",
        status: "Open",
        affectedSystem: "",
        reportedBy: "",
        assignedTo: "Unassigned",
        resolutionNotes: "",
    });

    // Show message when the incident is created successfully
    const [successMessage, setSuccessMessage] = useState("");

    // Show an error message if the incident cannot be created
    const [errorMessage, setErrorMessage] = useState("");

    // Update the form fields
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle the form submission without refreshing the browser page - Used for testing porpuses
    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     console.log("Incident form submitted:", formData);
    // };

    // Send the incident form to the backend API
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/incidents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Unable to create incident");
            }

            const newIncident = await response.json();

            // Let the user know that the incident was saved successfully
            setSuccessMessage("Incident reported successfully.");
            setErrorMessage("");

            // Clear the form after the incident gets submitted successfully
setFormData({
  title: "",
  description: "",
  severity: "Low",
  category: "",
  status: "Open",
  affectedSystem: "",
  reportedBy: "",
  assignedTo: "Unassigned",
  resolutionNotes: "",
});

            // Message display on the console under the inspect tool
            console.log("Incident created successfully:", newIncident);


        } catch (error) {
            // Show the error directly on the page if the request fails
            setErrorMessage(error.message);
            setSuccessMessage("");

            console.error("Error creating incident:", error.message);
        }
    };

    return (
        <main>
            {/* Heading incident page */}
            <h1>Report New Incident</h1>

            {/* Explaining the purpose of this page */}
            <p>Use this page to report a new cybersecurity incident.</p>

            {/* Form to collect information about the cybersecurity incident */}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Incident Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                {/* Field for the user to select the severity level of the incident */}
                <div>
                    <label htmlFor="severity">Severity</label>
                    <select
                        id="severity"
                        name="severity"
                        value={formData.severity}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Select severity
                        </option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>

                {/* Field for the user to select the type of cybersecurity incident */}
                <div>
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Select category
                        </option>
                        <option value="Malware">Malware</option>
                        <option value="Phishing">Phishing</option>
                        <option value="Unauthorized Access">Unauthorized Access</option>
                        <option value="Data Exposure">Data Exposure</option>
                        <option value="Network Attack">Network Attack</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Field for the user to select the current status of the incident */}
                <div>
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Select status
                        </option>
                        <option value="Open">Open</option>
                        <option value="Investigating">Investigating</option>
                        <option value="Contained">Contained</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>

                {/* Field for the user to record the affected system or device */}
                <div>
                    <label htmlFor="affectedSystem">Affected System</label>
                    <input
                        type="text"
                        id="affectedSystem"
                        name="affectedSystem"
                        value={formData.affectedSystem}
                        onChange={handleChange}
                    />
                </div>

                {/* Field for the user to record the affected user */}
                <div>
                    <label htmlFor="reportedBy">Reported By</label>
                    <input
                        type="text"
                        id="reportedBy"
                        name="reportedBy"
                        value={formData.reportedBy}
                        onChange={handleChange}
                    />
                </div>

                {/* Field to assign the incident ticket to an IT support member */}
                <div>
                    <label htmlFor="assignedTo">Assigned To</label>
                    <input
                        type="text"
                        id="assignedTo"
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleChange}
                    />
                </div>

                {/* Field for input notes by the IT support member */}
                <div>
                    <label htmlFor="resolutionNotes">Resolution Notes</label>
                    <textarea
                        id="resolutionNotes"
                        name="resolutionNotes"
                        value={formData.resolutionNotes}
                        onChange={handleChange}
                    />
                </div>

                {/* Button to submit the incident ticket */}
                <button type="submit">
                    Submit Incident
                </button>

                {/* Display the Successful or Error message after the user submit the incident ticket */}
                {successMessage && <p>{successMessage}</p>}

                {errorMessage && <p>Error: {errorMessage}</p>}
            </form>
        </main>
    );
}

// Export the page so it can be used by React Router in App.jsx
export default CreateIncidentPage;