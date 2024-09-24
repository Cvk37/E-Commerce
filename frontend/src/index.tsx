import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/index.css';
import { CartProvider } from './context/CartContext';
import { AuthenticationProvider } from './context/AuthenticationContext';
import { ToastContainer } from 'react-toastify';
import { DealsProvider } from './context/DealsContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

// React 18 uses the createRoot API, which works well in TypeScript.
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
     <GoogleOAuthProvider clientId='834395750898-43qltme321f5l7j8enm3dvlgfho51dd5.apps.googleusercontent.com'>
      <AuthenticationProvider>
        <DealsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </DealsProvider>
      </AuthenticationProvider>
      <ToastContainer />
    </GoogleOAuthProvider>

   
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

