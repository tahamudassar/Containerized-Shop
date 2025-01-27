import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/cartSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.cart.loggedIn);

  const handleLogout = () => {
    dispatch(logout());
    // Add any additional logic to reboot the navbar if necessary
  };

  return (
    loggedIn && (
      <button onClick={handleLogout}>
        Logout
      </button>
    )
  );
};

export default LogoutButton;
