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

    // Update the matching registration field when the user changes an input
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle the registration form submission without refreshing the page
    const handleSubmit = (event) => {
        event.preventDefault();

        // Added console.log for testing purposes
        console.log("Register form submitted:", formData);
    };

    return (
        <main>
            {/* Page heading for new user registration */}
            <h1>Register</h1>

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
            </form>
        </main>
    );
}

// Export the page so it can be used by React Router
export default RegisterPage;