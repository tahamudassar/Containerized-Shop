import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products/category-list')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
<div className="navbar-dropdown">
      <button className="navbar-button">Categories</button>
      <div className="navbar-dropdown-content">
        {categories.slice(0, 10).map((category, index) => (
          <button key={index} onClick={() => navigate(`/category/${category}`)}>
            {category.split(/[\s-]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
        {categories.length > 10 && <Link to="/all-categories">See All</Link>}
      </div>
    </div>
  );
};

export default CategoryDropdown;
