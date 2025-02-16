import React, { useContext, useState, useEffect } from 'react';
import AuthenticationContext from '../context/AuthenticationContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired, removeToken } from '../utils/authUtils';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';

const LoginComponent: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { isLoggedIn, setIsLoggedIn, setIsCartAccessAllowed } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      setIsLoggedIn(false);
      removeToken();
      navigate('/');
      toast.error('Session expired, please log in again.', { position: 'top-center' });
    }
  }, [setIsLoggedIn, navigate]);

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await axios.post<{ token: string }>('http://localhost:8080/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      setIsLoggedIn(true);
      setIsCartAccessAllowed(true);
      toast.success(`Welcome, ${username}!`, { position: 'top-center' });
      navigate('/');
    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error(`Login failed: ${error.response?.data?.message || error.message}`, { position: 'top-center' });
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const googleToken = credentialResponse.credential;
    if (!googleToken) {
      toast.error('Google login failed', { position: 'top-center' });
      return;
    }

    try {
      const response = await axios.post<{ jwt: string }>('http://localhost:8080/oauth/google', { token: googleToken });
      const jwtToken = response.data.jwt;
      localStorage.setItem('token', jwtToken);

      setIsLoggedIn(true);
      setIsCartAccessAllowed(true);
      toast.success('Google login successful!', { position: 'top-center' });
      navigate('/');
    } catch (error: any) {
      console.error('Google login failed:', error);
      toast.error(error.response?.data?.message || 'Google login failed', { position: 'top-center' });
    }
  };

  return (
    <GoogleOAuthProvider clientId="220254206189-ft6dgbisrfd591b28a7s28oieb021brl.apps.googleusercontent.com">
      <Container className="login-container" component="main" maxWidth="xs">
        <Paper elevation={6} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {!isLoggedIn && (
            <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Login
              </Button>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.error('Google Login Error');
                  toast.error('Google login failed', { position: 'top-center' });
                }}
              />
            </Box>
          )}
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default LoginComponent;
