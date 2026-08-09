import { useState } from "react";
import { useNavigate } from "react-router";

// This page will allow registered users to log in to the application
function LoginPage() {

    // Stores the email and password entered in the login page
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Store a message when the user's login attempt is unsuccessful
    const [loginError, setLoginError] = useState("");

    // Allow the application to redirect the user after a successful login
    const navigate = useNavigate();

    // Update the matching login field when the user changes an input
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Added console.log for testing purposes
    // console.log("Login form state:", formData);

    // Handle the login form submission without refreshing the page then sends the user's login credentials to the backend authentication API
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Clear any previous login error before trying again
        setLoginError("");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            // Stop the login process if the backend rejects the credentials
            if (!response.ok) {
                setLoginError(data.message);
                return;
            }

            // Store the authentication token so it can be used with protected API requests
            localStorage.setItem("token", data.token);

            // Send the authenticated user to the Home page
            navigate("/");

            // Added console.log for testing purposes
            // console.log("Login token stored successfully");
            // console.log("Login response status:", response.status);
            // console.log("Login message:", data.message);
            // console.log("JWT received:", Boolean(data.token));

        } catch (error) {
            console.error("Login request failed:", error);
        }
    };

    return (
        <main>
            {/* Page heading for user authentication */}
            <h1>Login</h1>

            <p>Log in to access the Cybersecurity Incident Tracker.</p>

            <form onSubmit={handleSubmit}>
                {/* Allow the user to enter the email associated with their account */}
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                {/* Allow the user to enter their account password */}
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                {/* Button to submit the user's login credentials */}
                <button type="submit">
                    Login
                </button>

                {/* Shows authentication error for fails attempts */}
                {loginError && <p>{loginError}</p>}
            </form>

            {/* Test button for testing the login handleChange function */}
            {/* <button type="button" onClick={() =>
                handleChange({
                    target: {
                        name: "email",
                        value: "testuser@example.com",
                    },
                })
            }
            > Test Login State
            </button> */}
        </main>
    );

    // Added console.log for testing porpuses
    // console.log("Current login email:", formData.email);
    // console.log("Current login password:", formData.password);
}

// Export the page so it can be used by React Router
export default LoginPage;