import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayProduct from '../components/DisplayProduct';

export default function CategoryDisplay() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  

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
      <DisplayProduct posts={products} />
    </div>
  );
}
