import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice'; // Import the addToCart action
import '../styles/DisplayProduct.css';  // Import the CSS file for styling
import DisplayProduct from '../components/DisplayProduct';  // Import DisplayProduct component
const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const [products, setProducts] = useState([]);
  const query = useQuery();
  const searchQuery = query.get('query');

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Dispatch the action to add item to the cart
  };

  useEffect(() => {
    if (searchQuery) {
      axiosInstance.get(`/products/search?q=${searchQuery}`)
        .then(response => {
          setProducts(response.data.products || []); // Ensure products is an array
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [searchQuery]);

  return (
    <div className="search-page">
      <h1>Search Results for "{searchQuery}"</h1>
      {products.length > 0 ? (
        <DisplayProduct posts={products} onAddToCart={handleAddToCart} />
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default SearchPage;
