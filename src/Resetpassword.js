// import React, { useState } from 'react';
// export default function Form() {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         reenter_password: '',
//     });
//     const [response, setResponse] = useState(null); // Store server response status or messages

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             if (formData.password !== formData.reenter_password) {
//                 console.log('Passwords do not match');
//                 setResponse('Passwords do not match');
//                 return;
//             }
//             else if (formData.password.length < 8) {
//                 setResponse('Password must be at least 8 characters long');
//                 return;
//             }

//             // Remove reenter_password key from formData before sending the data
//             const { reenter_password, ...requestData } = formData;
//             console.log(requestData);

//             const response = await fetch('http://localhost:8000/api/register/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestData),
//             });
//             console.log(response);
//             if (response.status === 201) {
//                 const data = await response.json(); // Parse the server response if needed
//                 setResponse('Registration successful!');
//                 console.log('Success:', data);
//             } else {
//                 const errorData = await response.json();
//                 setResponse(`Failed: ${errorData.message || 'Unknown error'}`);
//                 console.log('Error:', errorData);
//             }
//         } catch (error) {
//             setResponse('Failed: Server error');
//             console.error('Error:', error);
//         }
//     };
//     const handleResrtPwdRedirect =()=>{
//         useHistory.push('./resetpassword');
//     }
//     return (
//         <div>
//             <h2>Register</h2>
//             <form onSubmit={handleSubmit}>
//                 {Object.keys(formData).map((key) => (
//                     <div key={key}>
//                         <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
//                         <input
//                             id={key}
//                             name={key}
//                             type={key.includes('password') ? 'password' : 'text'} // Use password type for password fields
//                             placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//                             value={formData[key]}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 ))}
//                 <div>
//                     <button type="submit">Create aosijaAccount</button>
//                 </div>
//             </form>

//             {response && <p>{response}</p>} {/* Display server or validation messages */}
//             <button onClick={handleResrtPwdRedirect}>Forgot password?</button>
//         </div>
//     );
// }
