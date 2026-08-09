import { useParams } from "react-router";
import { useEffect, useState } from "react";

// This page will allow users to update an existing cybersecurity incident
function EditIncidentPage() {

    // Read the incident ID from the route in the URL
    const { id } = useParams();

    // Store the incident returned by the backend API
    const [incident, setIncident] = useState(null);

    // Track whether the incident is still being loaded
    const [loading, setLoading] = useState(true);

    // Store an error message if the incident cannot be retrieved
    const [error, setError] = useState("");

    // Added console.log for testing purposes
    // console.log("Incident state:", incident);
    // console.log("Loading state:", loading);
    // console.log("Error state is empty:", error === "");

    // Store the values that will be displayed and updated in the edit form
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

    // Added console.log for testing purposes
    console.log("Edit form state:", formData);

    // HandleChange function to update incident fields
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value, });
    };

    // Handle the form submission without refreshing the page
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Send the edited incident to the backend API
        try {
            const response = await fetch(`/api/incidents/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            console.log("Update response status:", response.status);

            const data = await response.json();

            console.log("Updated incident returned by API:", data);
        } catch (error) {
            console.error("Error updating incident:", error.message);
        }
        // Displays the edited form data - console.log for testing porpuses
        console.log("Updated incident form submitted:", formData);
    };

    // Retrieve the selected incident
    useEffect(() => {
        const getIncident = async () => {

            // Implement try/catch error handling
            try {
                const response = await fetch(`/api/incidents/${id}`);

                if (!response.ok) {
                    throw new Error("Unable to retrieve incident");
                }

                const data = await response.json();

                setIncident(data);

                // Copy the retrieved incident information into the edit form
                setFormData({
                    title: data.title,
                    description: data.description,
                    severity: data.severity,
                    category: data.category,
                    status: data.status,
                    affectedSystem: data.affectedSystem,
                    reportedBy: data.reportedBy,
                    assignedTo: data.assignedTo,
                    resolutionNotes: data.resolutionNotes,
                });

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getIncident();
    }, [id]);

    // Added console.log for testing purposes
    // console.log("Edit form data:", formData);

    return (
        <main>
            {/* Page heading for editing an existing incident */}
            <h1>Edit Incident</h1>

            {/* Paragrah to explain the action allowed */}
            <p>Update the information for the selected cybersecurity incident.</p>

            {/* Displays the incident ID from the URL */}
            <p>Incident ID: {id}</p>

            {/* Displays message when the incident is loading */}
            {loading && <p>Loading incident...</p>}

            {/* Displays error message if the incident cannot be retrieved */}
            {error && <p>Error: {error}</p>}

            {/* Displays the title to confirm the incident was retrieved */}
            {!loading && !error && incident && (
                <>
                    <p>Current Incident Title: {incident.title}</p>

                    <form onSubmit={handleSubmit}>
                        {/* Allow the user to update the incident title */}
                        <div>
                            <label htmlFor="title">Title: </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Allow the user to update the incident description */}
                        <div>
                            <label htmlFor="description">Description: </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Allow the user to update the incident severity */}
                        <div>
                            <label htmlFor="severity">Severity: </label>
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

                        {/* Allow the user to update the incident category */}
                        <div>
                            <label htmlFor="category">Category: </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="Malware">Malware</option>
                                <option value="Phishing">Phishing</option>
                                <option value="Unauthorized Access">Unauthorized Access</option>
                                <option value="Data Exposure">Data Exposure</option>
                                <option value="Network Attack">Network Attack</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Allow the user to update the incident status */}
                        <div>
                            <label htmlFor="status">Status: </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Open">Open</option>
                                <option value="Investigating">Investigating</option>
                                <option value="Contained">Contained</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                        </div>

                        {/* Allow the user to update the affected system */}
                        <div>
                            <label htmlFor="affectedSystem">Affected System: </label>
                            <input
                                type="text"
                                id="affectedSystem"
                                name="affectedSystem"
                                value={formData.affectedSystem}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Allow the user to update who reported the incident */}
                        <div>
                            <label htmlFor="reportedBy">Reported By: </label>
                            <input
                                type="text"
                                id="reportedBy"
                                name="reportedBy"
                                value={formData.reportedBy}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Allow the user to update who is assigned to the incident */}
                        <div>
                            <label htmlFor="assignedTo">Assigned To: </label>
                            <input
                                type="text"
                                id="assignedTo"
                                name="assignedTo"
                                value={formData.assignedTo}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Allow the user to update the resolution notes for the incident */}
                        <div>
                            <label htmlFor="resolutionNotes">Resolution Notes: </label>
                            <textarea
                                id="resolutionNotes"
                                name="resolutionNotes"
                                value={formData.resolutionNotes}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Button to submit the updated incident information */}
                        <button type="submit">
                            Update Incident
                        </button>
                    </form>
                </>
            )}

            {/* Test button for handleChange */}
            {/* <button type="button" onClick={() =>
                handleChange({
                    target: {
                        name: "title",
                        value: "Test Updated Title",
                    },
                })
            }
            >
                Test handleChange button </button> */}
        </main>
    );
    // Added console.log for testing purposes
    // console.log("Loading state:", loading);
    // console.log("Error state:", error);
    // console.log("Incident state:", incident);
    console.log("Current edit title:", formData.title);
    console.log("Current edit description:", formData.description);
    console.log("Current edit severity:", formData.severity);
    console.log("Current edit category:", formData.category);
    console.log("Current edit status:", formData.status);
    console.log("Current affected system:", formData.affectedSystem);
    console.log("Current reported by:", formData.reportedBy);
    console.log("Current assigned to:", formData.assignedTo);
    console.log("Current resolution notes:", formData.resolutionNotes);
}





// Export the page so it can be used by React Router in App.jsx
export default EditIncidentPage;