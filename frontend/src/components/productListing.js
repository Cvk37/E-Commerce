import { Button } from '@mui/material';
import React, { useEffect, useState , useContext } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import '../css/productListing.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CartContext from '../context/CartContext';

const IndividualProduct = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const { addToCart } = useContext(CartContext);
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

const handleAddToCart=()=>{
const productData = { product, images };
addToCart(productData);
console.log("product added to cart");
}

  if (!product) {
    return <div>Loading...</div>;
  }

  const { category } = product;
  
  return (
 <div className='product-show'>
   <Carousel className='carousel-container'>  
    {images.map(image => (
      <div key={image.id} className='image-container'> {/* Important: Slide wrapper */}
       <img className='image'
        src={image.url} 
        alt=''
        />
      </div>
     ))}
   </Carousel>
    <div className='product-description'>
       <h1>{product.name}</h1>
      <h2>Price: ${product.price}</h2>
       <p>{product.description}</p>
      <div>
      <Button  variant='contained' color='secondary' >Buy</Button>
      < span className='button-style'> <Button variant='contained' color='secondary' onClick={handleAddToCart}>Add to Cart</Button></span>
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
