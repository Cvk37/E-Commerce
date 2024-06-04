import React, { useState } from 'react';
import axios from 'axios';
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
   let formIsValid = true;
        if (!formData.username) {
      setErrors({ ...errors, username: 'Username is required' });
      formIsValid = false;
    }

    // Validate password
    if (!formData.password) {
      setErrors({ ...errors, password: 'Password is required' });
      formIsValid = false;
    } else if (formData.password.length < 8) {
      setErrors({ ...errors, password: 'Password must be at least 8 characters long' });
      formIsValid = false;
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.password)) {
      setErrors({ ...errors, password: 'Password must contain at least one lowercase letter, one uppercase letter, and one digit' });
      formIsValid = false;
    }

    // Validate email
    if (!formData.email) {
      setErrors({ ...errors, email: 'Email is required' });
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ ...errors, email: 'Email is invalid' });
      formIsValid = false;
    }

    // Validate firstName
    if (!formData.firstName) {
      setErrors({ ...errors, firstName: 'First name is required' });
      formIsValid = false;
    }

    // Validate lastName
    if (!formData.lastName) {
      setErrors({ ...errors, lastName: 'Last name is required' });
      formIsValid = false;
    }

    // Validate dateOfBirth
    if (!formData.dateOfBirth) {
      setErrors({ ...errors, dateOfBirth: 'Date of birth is required' });
      formIsValid = false;
    }
        
   


   if(formIsValid){
    try {
    const response = await axios.post('http://localhost:8080/register', formData);

      console.log('User registered successfully:', response.data);
    } catch (error) {
      console.error('Failed to register user:', error);
    
    }
   }
    
  }

  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
      {errors.username && <span className="error">{errors.username}</span>}
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
      {errors.password && <span className="error">{errors.password}</span>}
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      {errors.email && <span className="error">{errors.email}</span>}
      <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
      {errors.firstName && <span className="error">{errors.firstName}</span>}
      <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
      {errors.lastName && <span className="error">{errors.lastName}</span>}
      <input type="date" name="dateOfBirth" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleChange} />
      {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
      {/* Add other fields here */}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;