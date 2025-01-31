import React, { useState } from 'react';
import '../styles/Signup.css'; // Import the CSS file for styling
import { message } from 'antd'; // Import Ant Design message component
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        reenter_password: '',
        phone: '',
    });
    const [response, setResponse] = useState(null); // Store server response status or messages
    const [fieldErrors, setFieldErrors] = useState({}); // Store field-specific error messages
    const [messageApi, contextHolder] = message.useMessage(); // Initialize Ant Design message API
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFieldErrors({}); // Clear previous field errors
        try {
            if (formData.password !== formData.reenter_password) {
                setResponse('Passwords do not match');
                messageApi.error('Passwords do not match'); // Display error message
                return;
            } else if (formData.password.length < 12) {
                setResponse('Password must be at least 12 characters long');
                messageApi.error('Password must be at least 12 characters long'); // Display error message
                return;
            }

            // Remove reenter_password key from formData before sending the data
            const { reenter_password, ...requestData } = formData;

            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.status === 201) {
                const data = await response.json(); // Parse the server response if needed
                setResponse('Registration successful!');
                messageApi.success('Registration successful!'); // Display success message
                navigate('/signin'); // Redirect to the home page or any other page
            } else {
                const errorData = await response.json();
                if (errorData.non_field_errors) {
                    setResponse(`Failed: ${errorData.non_field_errors.join(', ')}`);
                    messageApi.error(`Failed: ${errorData.non_field_errors.join(', ')}`); // Display error message
                } else {
                    setFieldErrors(errorData); // Set field-specific error messages
                    setResponse('Failed: Please correct the errors below.');
                    messageApi.error('Failed: Please correct the errors below.'); // Display error message
                }
            }
        } catch (error) {
            setResponse('Failed: Unknown error');
            messageApi.error('Failed: Unknown error'); // Display error message
        }
    };

    return (
        <>
            {contextHolder} {/* Add context holder for Ant Design messages */}
            <div className="signup-container"> {/* Add the class here */}
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    {Object.keys(formData).map((key) => (
                        <div key={key}>
                            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                            <input
                                id={key}
                                name={key}
                                type={key.includes('password') ? 'password' : 'text'} // Use password type for password fields
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                value={formData[key]}
                                onChange={handleChange}
                            />
                            {fieldErrors[key] && <p className="error">{fieldErrors[key].join(', ')}</p>} {/* Display field-specific error messages */}
                        </div>
                    ))}
                    <div>
                        <button type="submit">Create Account</button>
                    </div>
                </form>

                {response && <p>{response}</p>} {/* Display server or validation messages */}
            </div>
        </>
    );
}
