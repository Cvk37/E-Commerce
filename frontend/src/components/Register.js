import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';

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

    // Validate username
    if (!formData.username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: 'Username is required' }));
      formIsValid = false;
    }

    // Validate password
    if (!formData.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
      formIsValid = false;
    } else if (formData.password.length < 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 8 characters long' }));
      formIsValid = false;
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must contain at least one lowercase letter, one uppercase letter, and one digit'
      }));
      formIsValid = false;
    }

    // Validate email
    if (!formData.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is invalid' }));
      formIsValid = false;
    }

    // Validate firstName
    if (!formData.firstName) {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: 'First name is required' }));
      formIsValid = false;
    }

    // Validate lastName
    if (!formData.lastName) {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: 'Last name is required' }));
      formIsValid = false;
    }

    // Validate dateOfBirth
    if (!formData.dateOfBirth) {
      setErrors((prevErrors) => ({ ...prevErrors, dateOfBirth: 'Date of birth is required' }));
      formIsValid = false;
    }

    if (formIsValid) {
      try {
        const response = await axios.post('http://localhost:8080/register', formData);
        console.log('User registered successfully:', response.data);
      } catch (error) {
        console.error('Failed to register user:', error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="dateOfBirth"
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.dateOfBirth}
            onChange={handleChange}
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
