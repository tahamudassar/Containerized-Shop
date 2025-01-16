import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, decreaseQuantity, addToCart } from '../store/slices/cartSlice';
// import '../styles/CheckOut.css'; // Assuming you have a CSS file for styling

const CheckOut = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const total = useSelector(state => state.cart.total); // Get total from the Redux store

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart({ id: id, forceZeroQuantity: true })); // Remove item completely
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
        <div className="checkout-container">
            <h1>Checkout Page</h1>
            {itemsArray.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <ul className="checkout-items">
                        {itemsArray.map(item => (
                            <li key={item.id} className="checkout-item">
                                <img src={item.thumbnail} alt={item.name} style={{ width: '50px', height: '50px' }} />
                                <span>{item.name} - {item.quantity} x ${item.price}</span>
                                <div className="checkout-item-buttons">
                                    <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                                    <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h2>Total: ${total.toFixed(2)}</h2> {/* Display the total rounded to 2 decimal places */}
                    <button>Proceed to Payment</button>
                </div>
            )}
        </div>
    );
};

export default CheckOut;