import { Link } from "react-router";

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/incidents">Incidents</Link>
    </nav>
  );
}

export default Navigation;