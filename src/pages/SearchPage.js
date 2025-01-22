import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice'; // Import the addToCart action
import '../styles/DisplayProduct.css';  // Import the CSS file for styling
import DisplayProduct from '../components/DisplayProduct';  // Import DisplayProduct component
import { Dropdown, Space } from 'antd'; // Import Ant Design components
import { DownOutlined } from '@ant-design/icons'; // Import Ant Design icons

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const items = [
  {
    label: 'Sort by Price,Low to High',
    key: '0',
  },
  {
    label: 'Sort by Price,High to Low',
    key: '1',
  },
  {
    label: 'Sort by Name',
    key: '2',
  },
  {
    label: 'Sort by Date',
    key: '3',
  },
];

const SearchPage = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const [products, setProducts] = useState([]);
  const query = useQuery();
  const searchQuery = query.get('query');

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Dispatch the action to add item to the cart
  };

  const handleMenuClick = (e) => {
    let sortedProducts = [...products];
    switch (e.key) {
      case '0':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case '1':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case '2':
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case '3':
        sortedProducts.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };

  useEffect(() => {
    if (searchQuery) {
      axiosInstance.get(`/products/search?q=${searchQuery}`)
        .then(response => {
          setProducts(response.data.products || []); // Ensure products is an array
        // console.log(products)

        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [searchQuery]);

  return (
    <div className="search-page">
      <h1>Search Results for "{searchQuery}"</h1>
      <Dropdown
        menu={{
          items,
          onClick: handleMenuClick, // Add onClick handler
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Sort
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      {products.length > 0 ? (
        <DisplayProduct posts={products} onAddToCart={handleAddToCart} />
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default SearchPage;
