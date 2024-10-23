import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Grid, Snackbar, Alert, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { UserContext } from '../UserContext';
import logo from '../assets/logo.png'; // Import the company logo
import Loader from './Loader'; 

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input changes and update state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/v1/login/', formData);

      if (response.status === 200) {
        setSuccessMessage('Login successful!');
        setErrorMessage('');

        // Save the access and refresh tokens
        localStorage.setItem('admin_access_token', response.data.access);
        localStorage.setItem('admin_refresh_token', response.data.refresh); // Save refresh token
        localStorage.setItem('admin_user', JSON.stringify(response.data.user)); // Save user details

        setUser(response.data.user);
        setSnackbarOpen(true);
        setTimeout(() => navigate('/overview'), 1); // Redirect to the overview page
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid credentials!');
      setSuccessMessage('');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        marginTop: '10vh',
        padding: 4,
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        border: '1px solid #495156',
        position: 'relative',
      }}
    >
      {/* Display Loader overlay when loading */}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          <Loader size={60} />
        </Box>
      )}

      {/* Company Logo */}
      <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
        <img src={logo} alt="Puku Rentals Logo" style={{ width: '150px' }} />
      </Box>

      <Typography variant="h5" textAlign="center" sx={{ color: '#071A35', fontWeight: 'bold' }}>
        Admin Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ marginTop: '10px' }}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              required
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              sx={{
                '& .MuiInputLabel-root': { color: '#495156' },
                input: { color: '#071A35' },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              sx={{
                '& .MuiInputLabel-root': { color: '#495156' },
                input: { color: '#071A35' },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: '#EB293A',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#D02232',
                },
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#FFFFFF' }} /> : 'Login'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert
          severity={successMessage ? 'success' : 'error'}
          sx={{ width: '100%', backgroundColor: successMessage ? '#4caf50' : '#EB293A' }}
        >
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
