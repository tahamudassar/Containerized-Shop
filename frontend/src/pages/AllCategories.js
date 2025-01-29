import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd'; // Import Button from antd
import './AllCategories.css'; // Import the CSS file

export default function AllCategories() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    return (
        <div className="categories-container">
            <h1>All Categories</h1>
            <ul className="categories-list">
                {categories.map(category => (
                    <li key={category.slug} className="category-item">
                        <Button type="primary" onClick={() => navigate(`/category/${category.name}`)}>
                            {category.name}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}