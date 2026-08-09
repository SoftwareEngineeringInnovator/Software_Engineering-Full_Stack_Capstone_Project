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

    // Added console.log for testing purposes
    console.log("Register form state:", formData);

    return (
        <main>
            {/* Page heading for new user registration */}
            <h1>Register</h1>

            <p>Create an account to access the Cybersecurity Incident Tracker.</p>

            {/* Test button to test the registration handleChange function */}
            <button type="button" onClick={() =>
                    handleChange({
                        target: {
                            name: "name",
                            value: "Test User",
                        },
                    })
                }
            > Test Register State
            </button>
        </main>
    );

    // Added console.log for testing purposes

}

// Export the page so it can be used by React Router
export default RegisterPage;