import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  
} from '@mui/material';
import { styled } from '@mui/system';
import { PhotoCamera, Close } from '@mui/icons-material';
import api from '../../../api';
import Loader from '../../Loader';

// Styled component for file input
const Input = styled('input')({
  display: 'none',
});

const AddCustomerModal = ({ open, handleClose }) => {
  // State for customer form fields
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    full_name: '',
    age: '',
    permanent_address: '',
    nic_number: '',
    primary_phone: '',
    secondary_phone: '',
    email: '',
    facebook_address: 'https://admin.okurentals.com/inventory',
    nic_front_photo: null,
    nic_back_photo: null,
  });

  const [loading, setLoading] = useState(false); // State for loading indicator
  const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' });

  // Handle input changes for form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file changes for NIC images
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a FormData object to send multipart/form-data
    const customerData = new FormData();
    customerData.append('username', formData.username);
    customerData.append('password', formData.password);
    customerData.append('full_name', formData.full_name);
    customerData.append('age', formData.age);
    customerData.append('permanent_address', formData.permanent_address);
    customerData.append('nic_number', formData.nic_number);
    customerData.append('primary_phone', formData.primary_phone);
    customerData.append('secondary_phone', formData.secondary_phone);
    customerData.append('email', formData.email);
    //customerData.append('facebook_address', formData.facebook_address);
    customerData.append('nic_front_photo', formData.nic_front_photo);
    customerData.append('nic_back_photo', formData.nic_back_photo);

    try {
      // API call to add a new customer
      await api.post('/customers/v1/', customerData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAlert({ open: true, severity: 'success', message: 'Customer added successfully!' });
      // Reset form fields after successful submission
      setFormData({
        username: '',
        password: '',
        full_name: '',
        age: '',
        permanent_address: '',
        nic_number: '',
        primary_phone: '',
        secondary_phone: '',
        email: '',
        facebook_address: 'https://admin.okurentals.com/inventory',
        nic_front_photo: null,
        nic_back_photo: null,
      });
      handleClose();
    } catch (error) {
      console.error('Error adding customer:', error);
      setAlert({ open: true, severity: 'error', message: 'Failed to add customer.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle Alert Close
  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          Add New Customer
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {loading && (
              <Box
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 2,
                }}
              >
                <Loader />
              </Box>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  fullWidth
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  fullWidth
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  fullWidth
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  fullWidth
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Permanent Address"
                  name="permanent_address"
                  value={formData.permanent_address}
                  onChange={handleChange}
                  required
                  fullWidth
                  multiline
                  rows={2}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="NIC Number"
                  name="nic_number"
                  value={formData.nic_number}
                  onChange={handleChange}
                  required
                  fullWidth
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Primary Phone (WhatsApp)"
                  name="primary_phone"
                  value={formData.primary_phone}
                  onChange={handleChange}
                  required
                  fullWidth
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Secondary Phone"
                  name="secondary_phone"
                  value={formData.secondary_phone}
                  onChange={handleChange}
                  fullWidth
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  disabled={loading}
                />
              </Grid>
              

              {/* NIC Front and Back Photo Upload */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel shrink>NIC Front Side Photo</InputLabel>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="nic_front_photo">
                      <Input
                        accept="image/*"
                        id="nic_front_photo"
                        type="file"
                        name="nic_front_photo"
                        onChange={handleFileChange}
                        disabled={loading}
                      />
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<PhotoCamera />}
                        sx={{ backgroundColor: '#EB293A', color: '#FFFFFF' }}
                        disabled={loading}
                      >
                        Upload
                      </Button>
                    </label>
                    {formData.nic_front_photo && (
                      <Typography variant="body2" sx={{ marginLeft: 2 }}>
                        {formData.nic_front_photo.name}
                      </Typography>
                    )}
                  </Box>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel shrink>NIC Back Side Photo</InputLabel>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="nic_back_photo">
                      <Input
                        accept="image/*"
                        id="nic_back_photo"
                        type="file"
                        name="nic_back_photo"
                        onChange={handleFileChange}
                        disabled={loading}
                      />
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<PhotoCamera />}
                        sx={{ backgroundColor: '#EB293A', color: '#FFFFFF' }}
                        disabled={loading}
                      >
                        Upload
                      </Button>
                    </label>
                    {formData.nic_back_photo && (
                      <Typography variant="body2" sx={{ marginLeft: 2 }}>
                        {formData.nic_back_photo.name}
                      </Typography>
                    )}
                  </Box>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Add Customer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddCustomerModal;
