import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayProduct from '../components/DisplayProduct';
import { addToCart } from '../store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function CategoryDisplay() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch(); // Dispatch actions
  
  const handleAddToCart = (post) => {
          // console.log('Adding to cart:', post);
          dispatch(addToCart(post)); // Dispatch the action to add item to the cart
      };
  useEffect(() => {
    const formattedCategory = category.replace(/\s+/g, '-');
    fetch(`https://dummyjson.com/products/category/${formattedCategory}`)
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching products:', error));
  }, [category]);

  return (
    <div>
      <h1>Products in {category} </h1>
      <DisplayProduct posts={products} onAddToCart={handleAddToCart} />
    </div>
  );
}
