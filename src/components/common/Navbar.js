import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../styles/Navbar.css'; // Optional: Add custom styling for the navbar
import MainLogo from '../../assets/logo.png'; // Import the logo image

const Navbar = ({ toggleSidebar, handleLogout }) => {
  const [categories, setCategories] = useState([]);
  const cartItems = useSelector((state) => state.cart); // Access cart items from Redux store
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products/category-list')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={MainLogo} alt="logo" onClick={() => navigate('/')} />
      </div>
      <div className="navbar-dropdown">
        <button className="navbar-button">Categories</button>
        <div className="navbar-dropdown-content">
          {categories.slice(0, 10).map((category, index) => (
            <button key={index} onClick={() => navigate(`/category/${category}`)}>
              {category.split(/[\s-]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
          {categories.length > 10 && <Link to="/all-categories">See All</Link>}
        </div>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create-accountss">Create Account</Link>
        </li>
        <li>
          <Link to="/fetch-user-data">Fetch User Data</Link>
        </li>
        <li>
          <Link to="/SignIn">Sign In</Link>
        </li>
        <li>
          <Link to="/ProtectedPage">Protected Page</Link>
        </li>
        <li>
          <Link to="/FullCartView">Full Cart View</Link>
        </li>
      </ul>
      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
      </div>
      <button className="navbar-button" onClick={toggleSidebar}>
        Cart ({cartItems.itemCount})
      </button>
      <button className="navbar-button logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
