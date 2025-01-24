import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../styles/Navbar.css'; // Optional: Add custom styling for the navbar
import MainLogo from '../../assets/logo.png'; // Import the logo image
import CategoryDropdown from './CategoryDropdown'; // Import CategoryDropdown component
import CartLogo from '../../assets/cart-icon.png'; // Import the cart icon image  

const Navbar = ({ toggleSidebar, handleLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const cartItems = useSelector((state) => state.cart); // Access cart items from Redux store
  var loggedIn = false
  loggedIn = useSelector((state) => state.cart.loggedIn); // Access loggedIn state from Redux store
  console.log("this is ;pgged in",loggedIn);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={MainLogo} alt="logo" onClick={() => navigate('/')} />
      </div>
      {/* <CategoryDropdown /> Use CategoryDropdown component */}
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {!loggedIn && (
          <>
            <li>
              <Link to="/create-account">Create Account</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/ProtectedPage">Protected Page</Link>
        </li>
        <li>
          <Link to="/FullCartView">Full Cart View</Link>
        </li>
      </ul>
      <div className="navbar-search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* <button type="submit">Search</button> */}
        </form>
      </div>
      <button className="navbar-button" onClick={toggleSidebar} >
        <img src={CartLogo} alt="cart" style={{width:20, height:20 }}/> 
        ({cartItems.itemCount})
      </button>
      {loggedIn ? (
        <button className="navbar-button logout" onClick={() => {
          handleLogout();
          navigate('/');
        }}>
          Logout
        </button>
      ) : null}
    </nav>
  );
};

export default Navbar;
