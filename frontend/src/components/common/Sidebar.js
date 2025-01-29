import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetCart, removeFromCart, decreaseQuantity, addToCart } from '../../store/slices/cartSlice';
import '../../styles/Sidebar.css';
import CartItemButtons from './CartItemButtons';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer } from 'antd';

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
    <Drawer
      title="Cart Items"
      placement="right"
      onClose={toggleSidebar}
      open={isOpen}
    >
      {itemsArray.length > 0 ? (
        <ul className="cart-items">
          {itemsArray.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.thumbnail} alt={item.name} style={{ width: '50px', height: '50px' }} />
              <span>{item.main_topic}  {item.quantity} x ${item.price}</span>
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
        <Button type="primary" onClick={() => navigate('checkout')}>Checkout</Button>
        <Button onClick={handleClearCart}>Clear Cart</Button>
        <Button onClick={toggleSidebar}>Close</Button>
      </div>
    </Drawer>
  );
};

export default Sidebar;
