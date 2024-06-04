import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/index.css'
import { CartProvider } from './context/CartContext';
import { AuthenticationProvider } from './context/AuthenticationContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
 <AuthenticationProvider>
 <CartProvider>
   <App />
 </CartProvider>
</AuthenticationProvider>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

