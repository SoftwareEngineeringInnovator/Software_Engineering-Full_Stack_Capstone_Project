import { useParams } from "react-router";
import { useEffect, useState } from "react";

// This page will display details of the cybersecurity incidents
function IncidentDetailsPage() {

    // Read the incident ID from the dynamic route in the browser URL.
    const { id } = useParams();

    // Store the incident returned by the backend API.
    const [incident, setIncident] = useState(null);

    // Track whether the incident is still being loaded.
    const [loading, setLoading] = useState(true);

    // Store an error message if the incident cannot be retrieved.
    const [error, setError] = useState("");

    // Retrieve the selected incident whenever the ID in the URL changes.
    useEffect(() => {
        const getIncident = async () => {
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
            {/* Page heading */}
            <h1>Incident Details</h1>

            {/* Loading message */}
            {loading && <p>Loading incident...</p>}

            {/* Error message if the incident cannot be retrieved */}
            {error && <p>Error: {error}</p>}

            {/* Display the incident title to confirm the API request works */}
            {!loading && !error && incident && (
                <>
                    <p>View the details of a selected cybersecurity incident.</p>
                    <p>Incident Title: {incident.title}</p>
                    <p>Description: {incident.description}</p>
                </>
            )}
        </main>
    );
}

// Export the page so it can be used by React Router in App.jsx
export default IncidentDetailsPage;