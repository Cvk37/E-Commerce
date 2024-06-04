import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Products from './components/products';
import IndividualProduct from './components/productListing';
import CustomNavbar from './components/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './components/cart';
import LoginComponent from './components/LoginComponent';
import Register from './components/Register';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';




const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        console.log("Axios Error Details:", error.toJSON());
      }
    };

    fetchData();
  }, []);


  return (
<div>

<BrowserRouter>

<CustomNavbar categories={data}/>
<Routes>
<Route path='/' element={<HomePage/>}/>
<Route path="/categories/:categoryId/:categoryName" element={<Products />} />

<Route path = "/products/:productName" element ={<IndividualProduct/>} />
<Route path='/cart' element={<Cart/>}/>
<Route path='/login' element={<LoginComponent/>} />
<Route path='/register' element={<Register/>} />


</Routes>
</BrowserRouter>
 
</div>
  );
};

export default App;
