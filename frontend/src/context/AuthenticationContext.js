import React, { createContext, useState,useEffect } from 'react';

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  
const [isCartAccessAllowed, setIsCartAccessAllowed] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('isLoggedIn') === 'true';
    } catch (error) {
      console.error('Error accessing localStorage', error);
      return false;
    }
  });
 useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn,isCartAccessAllowed,setIsCartAccessAllowed }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;