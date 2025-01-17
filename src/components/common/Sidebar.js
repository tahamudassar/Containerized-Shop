import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetCart, removeFromCart, decreaseQuantity, addToCart } from '../../store/slices/cartSlice';
import '../../styles/Sidebar.css';
import CartItemButtons from './CartItemButtons';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClearCart = () => {
    dispatch(resetCart());
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({ id: item.id, forceZeroQuantity: true }));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity({ id: item.id }));
  };

  const groupedItems = cartItems.reduce((acc, item) => {
    acc[item.id] = acc[item.id] || { ...item, quantity: 0 };
    acc[item.id].quantity += 1;
    return acc;
  }, {});

  const itemsArray = Object.values(groupedItems);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h2>Cart Items</h2>
      {itemsArray.length > 0 ? (
        <ul className="cart-items">
          {itemsArray.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.thumbnail} alt={item.name} style={{ width: '50px', height: '50px' }} />
              <span>{item.main_topic} - {item.quantity} x ${item.price}</span>
              <CartItemButtons
                item={item}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
                onRemove={handleRemoveItem}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <div className="sidebar-buttons">
        <button className="close-sidebar" onClick={() => navigate('checkout')}>Checkout</button>
        <button className="close-sidebar" onClick={handleClearCart}>Clear Cart</button>
        <button className="close-sidebar" onClick={toggleSidebar}>Close</button>
      </div>
    </div>
  );
};

export default Sidebar;
