import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetCart, removeFromCart, decreaseQuantity, addToCart } from '../../store/slices/cartSlice';
import '../../styles/Sidebar.css';
import CartItemButtons from './CartItemButtons';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(resetCart());
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ id, forceZeroQuantity: true }));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(addToCart({ id }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ id }));
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
                itemId={item.id}
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
        <button className="close-sidebar">Checkout</button>
        <button className="close-sidebar" onClick={handleClearCart}>Clear Cart</button>
        <button className="close-sidebar" onClick={toggleSidebar}>Close</button>
      </div>
    </div>
  );
};

export default Sidebar;
