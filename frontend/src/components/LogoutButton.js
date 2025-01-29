import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { logout } from '../store/slices/cartSlice'; // Adjust the import path as necessary

const LogoutButton = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.cart.loggedIn);

  const handleLogout = () => {
    dispatch(logout());
    // Add any additional logic to reboot the navbar if necessary
  };

  return (
    loggedIn && (
      <Button color="red" variant='filled' type="primary" onClick={handleLogout}>
        Logout
      </Button>
    )
  );
};

export default LogoutButton;
