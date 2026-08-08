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

                    <form>
                        {/* Allow the user to update the incident title */}
                        <div>
                            <label htmlFor="title">Title</label>
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
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Allow the user to update the incident severity */}
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
}





// Export the page so it can be used by React Router in App.jsx
export default EditIncidentPage;