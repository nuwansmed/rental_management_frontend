// src/components/Customers/EditCustomerDialog.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const EditCustomerDialog = ({ open, handleClose, customer, handleSave }) => {
  const [formData, setFormData] = useState({
    username: customer.username || '',
    password: '',  // Empty by default; only update if provided
    full_name: customer.full_name || '',
    age: customer.age || '',
    permanent_address: customer.permanent_address || '',
    nic_number: customer.nic_number || '',
    primary_phone: customer.primary_phone || '',
    secondary_phone: customer.secondary_phone || '',
    email: customer.email || '',
    facebook_address: customer.facebook_address || '',
    nic_front_photo: null,
    nic_back_photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const onSave = () => {
    handleSave(formData);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Customer</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              helperText="Leave blank to keep current password"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Permanent Address"
              name="permanent_address"
              value={formData.permanent_address}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="NIC Number"
              name="nic_number"
              value={formData.nic_number}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Primary Phone"
              name="primary_phone"
              value={formData.primary_phone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Secondary Phone"
              name="secondary_phone"
              value={formData.secondary_phone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Facebook Address"
              name="facebook_address"
              type="url"
              value={formData.facebook_address}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
              fullWidth
            >
              Upload NIC Front Photo
              <input
                type="file"
                accept="image/*"
                hidden
                name="nic_front_photo"
                onChange={handleFileChange}
              />
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
              fullWidth
            >
              Upload NIC Back Photo
              <input
                type="file"
                accept="image/*"
                hidden
                name="nic_back_photo"
                onChange={handleFileChange}
              />
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" sx={{ color: '#071A35' }}>
          Cancel
        </Button>
        <Button onClick={onSave} variant="contained" sx={{ backgroundColor: '#EB293A', color: '#FFFFFF' }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCustomerDialog;
