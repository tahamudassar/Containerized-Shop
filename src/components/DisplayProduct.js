// src/components/DisplayPosts.js
import React from 'react';
import '../styles/DisplayProduct.css';  // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

export default function DisplayProduct({ posts, onAddToCart }) {
  const navigate = useNavigate();

  return (
    <div className="posts-container">
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
              <button 
                className="add-to-cart-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(post);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
}
