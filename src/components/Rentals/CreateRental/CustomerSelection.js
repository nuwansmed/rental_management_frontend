// src/components/Rentals/CustomerSelection.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import api from '../../../api';

const CustomerSelection = ({ onCustomerSelect }) => {
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch customers when component mounts
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/admin_panel/customers/');
      setCustomerList(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleCustomerChange = (e) => {
    const customer = customerList.find((cust) => cust.nic === e.target.value);
    setSelectedCustomer(customer);
    onCustomerSelect(customer);
  };

  return (
    <Box sx={{ marginBottom: 4 }}>
      <FormControl fullWidth>
        <InputLabel>Search Customer by NIC</InputLabel>
        <Select
          value={selectedCustomer ? selectedCustomer.nic : ''}
          onChange={handleCustomerChange}
        >
          {customerList.map((customer) => (
            <MenuItem key={customer.nic} value={customer.nic}>
              {customer.nic} - {customer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCustomer && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body1">
            <strong>Customer Name:</strong> {selectedCustomer.name}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {selectedCustomer.phone_number}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {selectedCustomer.email}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CustomerSelection;
