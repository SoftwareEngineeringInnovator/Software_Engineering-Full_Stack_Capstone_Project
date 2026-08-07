// This page will allow users to POST/submit a new incident ticket
function CreateIncidentPage() {
  return (
    <main>
      {/* Heading incident page */}
      <h1>Report New Incident</h1>

      {/* Explaining the purpose of this page */}
      <p>Use this page to report a new cybersecurity incident.</p>
    </main>
  );
}

// Export the page so it can be used by React Router in App.jsx
export default CreateIncidentPage;