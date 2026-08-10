import { useState } from "react";
import { useNavigate } from "react-router";

// This page will allow new users to create an account
function RegisterPage() {

    // Store the information entered by the new user
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // Allow the application to redirect the user after successful registration
    const navigate = useNavigate();

    // Store an error message when registration is unsuccessful
    const [registerError, setRegisterError] = useState("");

    // Update the matching registration field when the user changes an input
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle the registration form submission without refreshing the page, then sends the new user's information to the backend registration API
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Clear any previous registration error before trying again
        setRegisterError("");

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            // Display the backend error message if registration is unsuccessful
            if (!response.ok) {
                setRegisterError(data.message);
                return;
            }

            // Send the new user to the Login page after successful registration
            navigate("/login");
        } catch (error) {
            console.error("Registration request failed:", error);

            setRegisterError(
                "Unable to register at this time. Please try again.",
            );
        }
    };

    return (
        <main>
            {/* Page heading for new user registration */}
            <h1>Register</h1>

            <br></br>

            <p>Create an account to access the Cybersecurity Incident Tracker.</p>

            <form onSubmit={handleSubmit}>
                {/* Allow the user to enter their name */}
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Allow the user to enter their email address */}
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Allow the user to create a password */}
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Submit the new user's registration information */}
                <button type="submit">Register</button>

                {/* Show a registration error when the request is unsuccessful */}
                {registerError && <p>{registerError}</p>}
            </form>
        </main>
    );
}

// Export the page so it can be used by React Router
export default RegisterPage;