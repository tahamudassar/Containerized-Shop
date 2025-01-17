// src/FullCartView.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import DisplayProduct from '../components/DisplayProduct'; // Import DisplayProduct component

export default function FullCartView() {
    const [posts, setPosts] = useState([]);
    const cartItems = useSelector(state => state.cart.items); // Access cart items from Redux store
    const dispatch = useDispatch(); // Dispatch actions

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => setPosts(data.products))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleAddToCart = (post) => {
        // console.log('Adding to cart:', post);
        dispatch(addToCart(post)); // Dispatch the action to add item to the cart
    };

    return (
        <div>
            <DisplayProduct posts={posts} onAddToCart={handleAddToCart} />
        </div>
    );
}
