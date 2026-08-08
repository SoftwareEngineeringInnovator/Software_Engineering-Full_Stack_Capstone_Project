// This page will display details of the cybersecurity incidents
function IncidentDetailsPage() {
  return (
    <main>
      {/* Page heading for the selected incident */}
      <h1>Incident Details</h1>

      {/* Page will retrieve incidents using its MongoDB ID */}
      <p>View the details of a selected cybersecurity incident.</p>
    </main>
  );
}

// Export the page so it can be used by React Router in App.jsx
export default IncidentDetailsPage;