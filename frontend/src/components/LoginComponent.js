import React, { useContext, useState } from 'react';
import AuthenticationContext from '../context/AuthenticationContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, setIsLoggedIn,setIsCartAccessAllowed } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  

const loginUser = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8080/login', { username, password });
    return response.data; // Assuming the response contains data indicating success or failure
  } catch (error) {
    throw error; // Forward any errors to be handled by the caller
  }
  
};

  const handleLogin = async (e) => {
     e.preventDefault();
    // Perform login logic (e.g., make an API call to authenticate user)
    try {
    
      await loginUser(username, password);
      // If login is successful, update isLoggedIn state to true
      setIsLoggedIn(true);
      setIsCartAccessAllowed(true);
      toast.success(`Welcome, ${username}!`,{position: "top-center"});
      navigate('/')
      
      
      
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(`Login failed: ${error.message}`,{position: "top-center"});
    }
  };

  return (
    <div>
      {!isLoggedIn && (     
  <form onSubmit={handleLogin} method='POST'>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginComponent;
