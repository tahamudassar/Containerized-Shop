import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import '../styles/ProductDetailPage.css'; // Import the CSS file for styling

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-image-container">
        <img src={product.thumbnail} alt={product.title} className="product-detail-image" />
      </div>
      <div className="product-detail-info">
        <h1 className="product-detail-title">{product.title}</h1>
        <p className="product-detail-description">{product.description}</p>
        <p className="product-detail-price">${product.price.toFixed(2)}</p>
        <button className="product-detail-add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
