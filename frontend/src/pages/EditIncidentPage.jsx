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
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getIncident();
    }, [id]);

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
                <p>Current Incident Title: {incident.title}</p>
            )}
        </main>
    );
    // Added console.log for testing purposes
    // console.log("Loading state:", loading);
    // console.log("Error state:", error);
    // console.log("Incident state:", incident);
}

// Export the page so it can be used by React Router in App.jsx
export default EditIncidentPage;