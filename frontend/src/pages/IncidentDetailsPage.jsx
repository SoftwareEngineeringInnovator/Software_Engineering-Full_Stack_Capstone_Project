import { useNavigate, useParams, Link } from "react-router";
import { useEffect, useState } from "react";

// This page will display details of the cybersecurity incidents
function IncidentDetailsPage() {

    // Read the incident ID from the dynamic route in the browser URL
    const { id } = useParams();

    // Allow the application to redirect the user to the Incident page
    const navigate = useNavigate();

    // Store the incident returned by the backend API.
    const [incident, setIncident] = useState(null);

    // Track whether the incident is still being loaded
    const [loading, setLoading] = useState(true);

    // Store an error message if the incident cannot be retrieved
    const [error, setError] = useState("");

    // Handle the Delete Incident button click - used for testing porpuses using Inspect tool
    // const handleDelete = () => {
    //     console.log("Delete button clicked for incident:", id);
    // };

    // Async Delete function to delete incidents from the database
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/incidents/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Unable to delete incident");
            }

            const data = await response.json();

            console.log("Incident deleted successfully:", data);

            // Return the user to the Incident page after a successful DELETE
            navigate("/incidents");


        } catch (error) {
            console.error("Error deleting incident:", error.message);
        }
    };

    // Retrieve the selected incident whenever the ID in the URL changes
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
                    <p>This page will display the details of a selected cybersecurity incident by ID.</p>
                    <p>Incident Title: {incident.title}</p>
                    <p>Description: {incident.description}</p>
                    <p>Severity: {incident.severity}</p>
                    <p>Category: {incident.category}</p>
                    <p>Status: {incident.status}</p>
                    <p>Affected System: {incident.affectedSystem}</p>
                    <p>Reported By: {incident.reportedBy}</p>
                    <p>Assigned To: {incident.assignedTo}</p>
                    <p>Resolution Notes: {incident.resolutionNotes}</p>
                </>
            )}

            <div className="incident-actions">
                {/* Button that will allow the user to delete an incident */}
                <button type="button" onClick={handleDelete}>
                    Delete Incident
                </button>

                {/* Button that will allow the user to edit an incident */}
                <Link to={`/incidents/${id}/edit`}>
                    <button type="button">
                        Edit Incident
                    </button>
                </Link>
            </div>
        </main>
    );
}

// Export the page so it can be used by React Router in App.jsx
export default IncidentDetailsPage;