import React from 'react';

const CartItemButtons = ({ itemId, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="cart-item-buttons">
      <button onClick={() => onIncrease(itemId)}>+</button>
      <button onClick={() => onDecrease(itemId)}>-</button>
      <button onClick={() => onRemove(itemId)}>Remove</button>
    </div>
  );
};

export default CartItemButtons;
