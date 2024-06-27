import { Button } from '@mui/material';
import React, { useEffect, useState, useContext} from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import '../css/productListing.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CartContext from '../context/CartContext';
import DealsContext from '../context/DealsContext'; // Import DealsContext
import AuthenticationContext from '../context/AuthenticationContext'

const IndividualProduct = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const { addToCart } = useContext(CartContext);
  const{isCartAccessAllowed}=useContext(AuthenticationContext);
  const { deals } = useContext(DealsContext); // Access activeDeals from DealsContext
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product details
        const productResponse = await fetch(`http://localhost:8080/products/${productName}`);
        if (!productResponse.ok) {
          throw new Error(`Failed to fetch product: ${productResponse.statusText}`);
        }
        const productData = await productResponse.json();
        setProduct(productData);

        // Fetch images
        const imagesResponse = await fetch(`http://localhost:8080/product/${productName}`);
        if (!imagesResponse.ok) {
          throw new Error(`Failed to fetch images: ${imagesResponse.statusText}`);
        }
        const imageData = await imagesResponse.json();
        setImages(imageData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    if (productName) {
      fetchData();
    }
  }, [productName]);

  const handleAddToCart = () => {
    console.log(isCartAccessAllowed)
    if(!isCartAccessAllowed){
    navigate("../login")
    return
    }
    const productData = { product, images };
    addToCart(productData);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { category, price } = product;
  // Calculate discounted price if there's an active deal
  let discountedPrice = null;
   const currentDeal = deals.find(deal => {
  return deal.product.productId === product.productId;
});
  if (currentDeal) {
    discountedPrice = (price * (1 - currentDeal.discount / 100)).toFixed(2);
    
  }

  return (
    <div className='product-show'>
      <Carousel className='carousel-container'>
        {images.map(image => (
          <div key={image.id} className='image-container'>
            <img className='image'
              src={image.url}
              alt=''
            />
          </div>
        ))}
      </Carousel>
      <div className='product-description'>
        <h1>{product.name}</h1>
        {discountedPrice ? (
          <>
            <h2>Price: <span className="original-price">${price.toFixed(2)}</span></h2>
            <h2>Deal Price: <span className="discounted-price">${discountedPrice}</span></h2>
          </>
        ) : (
          <h2>Price: ${price.toFixed(2)}</h2>
        )}
        <p>{product.description}</p>
        <div>
          <Button variant='contained' color='secondary'>Buy</Button>
          <span className='button-style'>
            <Button variant='contained' color='secondary' onClick={handleAddToCart}>Add to Cart</Button>
          </span>
        </div>
        <a href={`http://localhost:3000/categories/${category.categoryId}/${category.name}`}>Home</a>
        <Button component={Link} to="http://localhost:3000">
          Home Page
        </Button>
      </div>
    </div>
  );
};

export default IndividualProduct;
