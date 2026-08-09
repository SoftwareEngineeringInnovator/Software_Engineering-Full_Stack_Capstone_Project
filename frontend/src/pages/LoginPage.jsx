import { useState } from "react";

// This page will allow registered users to log in to the application
function LoginPage() {

    // Stores the email and password entered in the login page
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Added console.log for testing purposes
    console.log("Login form state:", formData);

    return (
        <main>
            {/* Page heading for user authentication */}
            <h1>Login</h1>

            <p>Log in to access the Cybersecurity Incident Tracker.</p>
        </main>
    );
}

// Export the page so it can be used by React Router
export default LoginPage;