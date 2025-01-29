import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ProceedToCheckoutButton = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Button type="primary" onClick={handleCheckout}>
      Proceed to Checkout
    </Button>
  );
};

export default ProceedToCheckoutButton;
