import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import DealsContext from '../context/DealsContext';
import '../css/Products.css';

const Products = () => {
  const { categoryId, categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const { deals } = useContext(DealsContext);

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

  // Function to calculate discounted price
  const calculateDiscountedPrice = (product) => {
    const currentDeal = deals.find(deal => deal.product.productId === product.productId);

    if (currentDeal) {
      const discountedPrice = (product.price * (1 - currentDeal.discount / 100)).toFixed(2);
      return discountedPrice;
    }
    return null; // Return null if no deal found
  };

  // Function to determine if a product has a deal
  const hasDeal = (productId) => {
    return deals.some(deal => deal.product.productId === productId);
  };

  return (
    <div className="products-container">
      <h1>{categoryName}</h1>
      <ul className="products-list">
        {products.map(product => (
          <li key={product.productId} className="product-item">
            {product.images && product.images.length > 0 && (
              <img src={product.images[0].url} alt={product.name} className="product-image" />
            )}
            <div className="product-details">
              <Link to={`/products/${product.name}`} className="product-name">{product.name}</Link>
              <span className="product-description">{product.description}</span> 
              {hasDeal(product.productId) ? (
                <>
                  <span className="original-price">${product.price.toFixed(2)}</span>
                  <span className="discounted-price">${calculateDiscountedPrice(product)}</span>
                </>
              ) : (
                <span className="price">${product.price.toFixed(2)}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
      <Button
        component={Link}
        to="http://localhost:3000"
        variant="contained"
        color="primary"
        className="home-button"
      >
        Home Page
      </Button>
    </div>
  );
};

export default Products;
