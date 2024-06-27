import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '../css/Navbar.css';
import SearchBar from './searchBar';
import { Cart } from 'react-bootstrap-icons';
import AuthenticationContext  from '../context/AuthenticationContext';
import CartContext from '../context/CartContext';
import { Badge } from 'react-bootstrap';
import logoImage from '../images/Sho.png';
const CustomNavbar = ({ categories }) => {

  const { isLoggedIn, setIsLoggedIn,isCartAccessAllowed,setIsCartAccessAllowed} = useContext(AuthenticationContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsCartAccessAllowed(false);
  };

  const { cartItems } = useContext(CartContext);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/"> <img
          src={logoImage}  // Use the imported image path here
          width="70"
          height="60"
          className="Logo"
          alt="Your Logo"
        /> </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {categories.map(category => (
            <Nav.Link key={category.categoryId} as={Link} to={`/categories/${category.categoryId}/${category.name}`}>
              {category.name}
            </Nav.Link>
          ))}
        </Nav>
        <div className='search'><SearchBar/></div>
        {!isLoggedIn ? (
          <>
            <Nav.Link as={Link} to="/login" className='login'>Login</Nav.Link>
            <Nav.Link as={Link} to="/register" className='register'>Register</Nav.Link>
          </>
        ) : (
          <Nav.Link as={Link} to="/" onClick={handleLogout} className='login'>Logout</Nav.Link>
        )}
        <Nav.Link as={Link} to={isLoggedIn ? "/cart" : "/login"} className='cart'>
          <Cart size={24}/> 
          <span className="cart-text">Cart</span>
          {cartItemCount > 0 && <Badge bg="primary">{cartItemCount}</Badge>}
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
