import React, { useEffect, useState } from 'react';
import {Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

const Products = () => {
  const { categoryId, categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/categories/${categoryId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div>
      <h1>{categoryName}</h1>
      <ul style={{ padding: 0 }}>
        {products.map(product => (
          <li key={product.id}>
             <Link to={`/products/${product.name}`}>{product.name}</Link> - {product.description} - ${product.price}
          </li>
        ))}
      <Button component={Link} to="http://localhost:3000" variant="contained" color="primary" style={{marginTop:5}}>
          Home Page
      </Button>
      </ul>
   
    </div>
  );
};

export default Products;
