import { Link } from "react-router";

// This component provides shared navigation links for the application
function Navigation() {
  return (
    <nav>
      {/* Link to the Home page */}
      <Link to="/">Home</Link>

      {/* Link to the incidents page */}
      <Link to="/incidents">Incidents</Link>
    </nav>
  );
}

// Export the component so it can be used in App.jsx
export default Navigation;