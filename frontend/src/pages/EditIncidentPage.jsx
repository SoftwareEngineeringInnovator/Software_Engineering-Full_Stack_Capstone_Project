import { useParams } from "react-router";
import { useEffect, useState } from "react";

// This page will allow users to update an existing cybersecurity incident
function EditIncidentPage() {

    // Read the incident ID from the route in the URL
    const { id } = useParams();

    // Store the incident returned by the backend API
    const [incident, setIncident] = useState(null);

    return (
        <main>
            {/* Page heading for editing an existing incident */}
            <h1>Edit Incident</h1>

            {/* Paragrah to explain the action allowed */}
            <p>Update the information for the selected cybersecurity incident.</p>

            {/* Display the incident ID from the URL */}
            <p>Incident ID: {id}</p>
        </main>
    );
}

// Export the page so it can be used by React Router in App.jsx
export default EditIncidentPage;