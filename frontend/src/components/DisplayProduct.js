// src/components/DisplayPosts.js
import React from 'react';
import '../styles/DisplayProduct.css';  // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd'; // Import Button and message from antd

export default function DisplayProduct({ posts, onAddToCart }) {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage(); // Use message API from antd

  const handleAddToCart = (post, e) => {
    e.stopPropagation();
    onAddToCart(post);
    messageApi.open( {type:'success',content: 'Added to cart',}); // Display "Added to cart" message
  };

  return (
    <div className="posts-container">
      {contextHolder} {/* Context holder for message */}
      {posts.length > 0 ? (
        <div className="posts-grid">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="post-card" 
              onClick={() => navigate(`/product/${post.id}`)}
            >
              <img src={post.thumbnail} alt="Product" className="product-image" />
              <h3 className="post-title">{post.title}</h3>
              <p className="post-description">{post.description}</p>
              <p className="post-price">${post.price.toFixed(2)}</p>
              <Button 
                className="add-to-cart-btn" 
                onClick={(e) => handleAddToCart(post, e)}
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
}
