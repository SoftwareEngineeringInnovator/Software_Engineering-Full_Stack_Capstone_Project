import { useState } from "react";

// This page will allow registered users to log in to the application
function LoginPage() {

    // Stores the email and password entered in the login page
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Update the matching login field when the user changes an input
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Added console.log for testing purposes
    console.log("Login form state:", formData);

    return (
        <main>
            {/* Page heading for user authentication */}
            <h1>Login</h1>

            <p>Log in to access the Cybersecurity Incident Tracker.</p>

            <form>
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
            </form>

            {/* Test button for testing the login handleChange function */}
            <button type="button" onClick={() =>
                handleChange({
                    target: {
                        name: "email",
                        value: "testuser@example.com",
                    },
                })
            }
            > Test Login State
            </button>
        </main>
    );

    // Added console.log for testing porpuses
    console.log("Current login email:", formData.email);
    console.log("Current login password:", formData.password);
}

// Export the page so it can be used by React Router
export default LoginPage;