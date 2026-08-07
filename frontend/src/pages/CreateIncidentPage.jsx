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

    // Update the form fields
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <main>
            {/* Heading incident page */}
            <h1>Report New Incident</h1>

            {/* Explaining the purpose of this page */}
            <p>Use this page to report a new cybersecurity incident.</p>

            {/* Form to collect information about the cybersecurity incident */}
            <form>
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
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
            </form>
        </main>
    );
}

// Export the page so it can be used by React Router in App.jsx
export default CreateIncidentPage;