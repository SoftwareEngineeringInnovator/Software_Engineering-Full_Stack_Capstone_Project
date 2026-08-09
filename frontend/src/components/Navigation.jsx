import { Link, useNavigate } from "react-router";

// This component provides shared navigation links for the application
function Navigation() {

    // Allow the application to redirect the user after logging out
    const navigate = useNavigate();

    // Check whether an authentication token is currently stored
    const token = localStorage.getItem("token");

    // Remove the stored JWT and return the user to the Login page
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav>
            {/* Link to the Home page */}
            <Link to="/">Home</Link>

            {/* Link to the incidents page */}
            <Link to="/incidents">Incidents</Link>

            {/* Link to the page where users report the incident */}
            <Link to="/incidents/new">Report Incident</Link>

            {/* Show Login and Register when the user is not authenticated */}
            {!token && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}

            {/* Allow an authenticated user to end their current session */}
            {token && (
                <button type="button" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </nav>
    );
}

// Export the component so it can be used in App.jsx
export default Navigation;