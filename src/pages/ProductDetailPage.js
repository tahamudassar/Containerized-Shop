import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import '../styles/ProductDetailPage.css'; // Import the CSS file for styling

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-detail-container">
      <img src={product.thumbnail} alt={product.title} className="product-detail-image" />
      <h1 className="product-detail-title">{product.title}</h1>
      <p className="product-detail-description">{product.description}</p>
      <p className="product-detail-price">${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductDetailPage;
