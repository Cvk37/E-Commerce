import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import '../css/Navbar.css';
import SearchBar from './searchBar.tsx';
import { Cart } from 'react-bootstrap-icons';
import AuthenticationContext from '../context/AuthenticationContext';
import CartContext from '../context/CartContext';
import logoImage from '../images/Sho.png';

interface Category {
  categoryId: string;
  name: string;
}

interface CustomNavbarProps {
  categories: Category[];
}

const CustomNavbar: React.FC<CustomNavbarProps> = ({ categories }) => {
  const { isLoggedIn, setIsLoggedIn, setIsCartAccessAllowed } = useContext(AuthenticationContext);
  const { cartItems } = useContext(CartContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsCartAccessAllowed(false);
  };

  const cartItemCount = cartItems.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);

  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Brand className="logo" as={Link} to="/">
        <img src={logoImage} width="70" height="60" className="Logo" alt="Your Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {categories.map((category) => (
            <Nav.Link key={category.categoryId} as={Link} to={`/categories/${category.categoryId}/${category.name}`}>
              {category.name}
            </Nav.Link>
          ))}
        </Nav>
        <div className="search">
          <SearchBar />
        </div>
        {!isLoggedIn ? (
          <>
            <Nav.Link as={Link} to="/login" className="login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="register">
              Register
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/" onClick={handleLogout} className="login">
              Logout
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" className="register">
              My Profile
            </Nav.Link>
          </>
        )}
        {isLoggedIn && (
          <Nav.Link as={Link} to="/cart" className="cart">
            <Cart size={24} />
            <span className="cart-text">Cart</span>
            {cartItemCount > 0 && <Badge bg="primary">{cartItemCount}</Badge>}
          </Nav.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
