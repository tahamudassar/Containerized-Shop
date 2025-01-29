import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

export default function Forms() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    reenter_password: '',
  });
  const [response, setResponse] = useState(null);
//   const navigate = useNavigate();

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
      if (formData.password !== formData.reenter_password) {
        setResponse('Passwords do not match');
        return;
      } else if (formData.password.length < 8) {
        setResponse('Password must be at least 8 characters long');
        return;
      }

      const { reenter_password, ...requestData } = formData;
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 201) {
        setResponse('Registration successful!');
        // navigate('/mainForm'); // Navigate to MainForm on success
      } else {
        const errorData = await response.json();
        setResponse(`Failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      setResponse('Failed: Server error');
    }
  };

//   const handleResetPwdRedirect = () => {
//     navigate('/resetpassword');
//   };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              id={key}
              name={key}
              type={key.includes('password') ? 'password' : 'text'}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <div>
          <button type="submit">Create Account</button>
        </div>
      </form>
      {response && <p>{response}</p>}
      {/* <button onClick={handleResetPwdRedirect}>Forgot password?</button> */}
    </div>
  );
}
