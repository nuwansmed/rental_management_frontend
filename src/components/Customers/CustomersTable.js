// src/components/Customers/CustomersTable.js
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

const CustomersTable = ({
  customers,
  filteredCustomers,
  loading,
  handleEditCustomerClick,
  handleDeleteCustomer,
  handleViewImages,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Permanent Address</TableCell>
            <TableCell>NIC Number</TableCell>
            <TableCell>Primary Phone</TableCell>
            <TableCell>Secondary Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>NIC Photos</TableCell>
            
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={12} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.username}</TableCell>
                <TableCell>{customer.full_name}</TableCell>
                <TableCell>{customer.age}</TableCell>
                <TableCell>{customer.permanent_address}</TableCell>
                <TableCell>{customer.nic_number}</TableCell>
                <TableCell>{customer.primary_phone}</TableCell>
                <TableCell>{customer.secondary_phone || 'N/A'}</TableCell>
                <TableCell>{customer.email || 'N/A'}</TableCell>
                <TableCell>
                  {customer.nic_front_photo ? (
                    <IconButton onClick={() => handleViewImages(customer.nic_front_photo, customer.nic_back_photo)}>
                      <Visibility color="primary" />
                    </IconButton>
                  ) : 'N/A'}
                </TableCell>
                
                <TableCell>
                  <IconButton onClick={() => handleEditCustomerClick(customer)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCustomer(customer.id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={12} align="center">
                No customers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomersTable;
