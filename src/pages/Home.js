// src/FullCartView.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import DisplayProduct from '../components/DisplayProduct'; // Import DisplayProduct component
import AddToCartPopUp from '../components/common/AddToCartPopUp'; // Import AddToCartPopUp component
import { Dropdown, Space } from 'antd'; // Import Ant Design components
import { DownOutlined } from '@ant-design/icons'; // Import Ant Design icons
import axios from 'axios'; // Import axios

const api = axios.create({
  baseURL: 'https://dummyjson.com', // Set the base URL for the API
});


export default function FullCartView() {
    const [posts, setPosts] = useState([]);
    const cartItems = useSelector(state => state.cart.items); // Access cart items from Redux store
    const dispatch = useDispatch(); // Dispatch actions

    useEffect(() => {
        api.get('/products')
            .then(res => setPosts(res.data.products))
            .catch(error => console.error('Error fetching products:', error));
    }, [api]);

    const handleAddToCart = (post) => {
        dispatch(addToCart(post)); // Dispatch the action to add item to the cart
        <AddToCartPopUp />;
    };

    return (
        <div>
            <DisplayProduct posts={posts} onAddToCart={handleAddToCart} />
        </div>
    );
}
