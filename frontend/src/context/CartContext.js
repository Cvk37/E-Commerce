import React, { createContext, useState,useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (productData) => {
    const { product, images } = productData;
      const existingItemIndex = cartItems.findIndex((item) => item.product.id === product.id);
   if (existingItemIndex !== -1) {
    // If the product is already in the cart, update its quantity
    const updatedCartItems = [...cartItems];
    updatedCartItems[existingItemIndex].quantity++;
    setCartItems(updatedCartItems);
  } else {
    // If the product is not in the cart, add it with quantity 1
    setCartItems([...cartItems, { product, images, quantity: 1 }]);
  }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart,setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
