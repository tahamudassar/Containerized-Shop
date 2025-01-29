import React, { useState, useEffect } from 'react';

const UserData = () => {
  // State for formData, with userID as part of it
  const [formData, setFormData] = useState({
    userID: 1, // Initial value for userID
  });

  // State to store fetched user data
  const [user, setUser] = useState(null);

  // State for handling form input
  const [inputUserID, setInputUserID] = useState(formData.userID);

  const [error, setError] = useState(null);
  // useEffect that runs when formData.userID changes
  useEffect(() => {
    console.log("Fetching new user data...");

    // Fetch user data from API when userID changes
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/user/${formData.userID}/`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setUser(data); // Set the user data in state
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.statusText); // Set error in state
        setUser(null); // Clear user data on error
      }
    };

    fetchUserData(); // Call the function to fetch data
  }, [formData.userID]); // Dependency array makes it run when userID changes

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setFormData({ ...formData, userID: parseInt(inputUserID, 10) }); // Update userID in formData
  };

  return (
    <div>
      <h1>User Information</h1>

      {/* Form to change userID */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="userID">Enter UserID:</label>
        <input
          type="number"
          id="userID"
          value={inputUserID}
          onChange={(e) => setInputUserID(e.target.value)}
        />
        <button type="submit">Fetch User Data</button>
      </form>

      <p>Current UserID: {formData.userID}</p>

      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>{error ? `Error: ${error}` : 'No user data available'}</p>
      )}
    </div>
  );
};

export default UserData;
