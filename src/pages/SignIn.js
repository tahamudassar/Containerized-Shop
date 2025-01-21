import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoggedIn } from '../store/slices/cartSlice'; // Import setLoggedIn action

export default function SignIn () {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [response, setResponse] = useState(null); // Store server response status or messages
    const dispatch = useDispatch(); // Initialize dispatch
    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            // console.log(response);
            if (response.status === 200) {
                const data = await response.json(); // Parse the server response if needed
                setResponse('login successful!');
                localStorage.setItem('Accesstoken', data.access);
                // console.log('Success:', data);
                dispatch(setLoggedIn(true)); // Set loggedIn to true
                
                navigate('/'); // Redirect to homepage
            } else {
                const errorData = await response.json();
                setResponse(`Failed: ${errorData.message || 'Unknown error'}`);
                console.log('Error:', errorData);
            }
        } catch (error) {
            setResponse('Failed: Server error');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
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
                    </div>
                ))}
                <div>
                    <button type="submit">Log In</button>
                </div>
            </form>

            {response && <p>{response}</p>} {/* Display server or validation messages */}
        </div>
    );
}
