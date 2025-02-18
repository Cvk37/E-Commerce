import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';

// Define the form data structure
interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

// Define the error structure
interface FormErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  apiError?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error when user types
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors: FormErrors = {};

    // Validate username
    if (!formData.username) newErrors.username = 'Username is required';

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter, one uppercase letter, and one digit';
    }

    // Validate confirmPassword
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Validate firstName
    if (!formData.firstName) newErrors.firstName = 'First name is required';

    // Validate lastName
    if (!formData.lastName) newErrors.lastName = 'Last name is required';

    // Validate dateOfBirth
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

    // Check if there are any validation errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      formIsValid = false;
    }

    if (formIsValid) {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:8080/register', formData);
        console.log('User registered successfully:', response.data);
      } catch (error: any) {
        setErrors((prev) => ({
          ...prev,
          apiError: error.response?.data?.message || 'Registration failed. Please try again.'
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {errors.apiError && <Typography color="error">{errors.apiError}</Typography>}
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
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
