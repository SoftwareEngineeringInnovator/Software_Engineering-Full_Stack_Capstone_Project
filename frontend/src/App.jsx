import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Store the incidents returned by the API backend
  const [incidents, setIncidents] = useState([]);

  // Track loading request
  const [loading, setLoading] = useState(true);

  // Store an error messages
  const [error, setError] = useState("");

  useEffect(() => {
    const getIncidents = async () => {
      try {
        const response = await fetch("/api/incidents");

        if (!response.ok) {
          throw new Error("Unable to retrieve incidents");
        }

        const data = await response.json();

        setIncidents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getIncidents();
  }, []);

  return (
    <main>
      {/* Display element definitions on the page */}
      <h1>Cybersecurity Incident Tracker</h1>
      <p>Frontend and backend connection test</p>

      {loading && <p>Loading incidents...</p>}

      {error && <p>Error: {error}</p>}

      {!loading && !error && incidents.length === 0 && (
        <p>No incidents have been reported.</p>
      )}

      {incidents.map((incident) => (
        <article key={incident._id}>
          <h2>{incident.title}</h2>
          <p>{incident.description}</p>
          <p>Severity: {incident.severity}</p>
          <p>Status: {incident.status}</p>
        </article>
      ))}
    </main>
  );
}

export default App;