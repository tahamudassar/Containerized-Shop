import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/DisplayProduct.css';  // Import the CSS file for styling
import DisplayProduct from '../components/DisplayProduct';  // Import DisplayProduct component

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const SearchPage = ({ searchQuery, onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      axiosInstance.get(`/products/search?q=${searchQuery}`)
        .then(response => {
          setProducts(response.data.products);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [searchQuery]);

  return (
    <div className="search-page">
      <h1>Search Results for "{searchQuery}"</h1>
      <DisplayProduct products={products} onAddToCart={onAddToCart} />
    </div>
  );
};

export default SearchPage;
