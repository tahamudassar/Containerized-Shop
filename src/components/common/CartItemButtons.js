import React from 'react';

const CartItemButtons = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="cart-item-buttons">
      <button onClick={() => onIncrease(item)}>+</button>
      <button onClick={() => onDecrease(item)}>-</button>
      <button onClick={() => onRemove(item)}>Remove</button>
    </div>
  );
};

export default CartItemButtons;
