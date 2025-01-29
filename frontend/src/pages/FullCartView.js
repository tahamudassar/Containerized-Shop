import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, removeFromCart, addToCart } from '../store/slices/cartSlice';
import {useNavigate} from 'react-router-dom';
import { Button } from 'antd';
import '../styles/FullCartView.css';

const FullCartView = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const navigate = useNavigate();

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ id: id }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ id: id, forceZeroQuantity: true })); // Remove item completely
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart(item));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const groupedItems = cartItems.reduce((acc, item) => {
    acc[item.id] = acc[item.id] || { ...item, quantity: 0 };
    acc[item.id].quantity += 1;
    return acc;
  }, {});

  const itemsArray = Object.values(groupedItems);

  if (itemsArray.length === 0) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        <p>Your cart is currently empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {itemsArray.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.name} className="cart-item-thumbnail" style={{ width: '50px', height: '50px' }} />
            <div className="cart-item-details">
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
              <button onClick={() => handleIncreaseQuantity(item)}>+</button>
              <button onClick={() => handleRemoveItem(item.id)}>Remove Item</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h2>Total: ${total}</h2>
      </div>
      <Button type="primary" onClick={handleCheckout}>Proceed to Checkout</Button>
      {/* <ProceedToCheckoutButton /> */}
      {/* <button onClick={handleCheckout}>Proceed to Checkout</button> */}
    </div>
  );
};

export default FullCartView;
