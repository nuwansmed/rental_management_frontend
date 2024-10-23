// src/components/Customers/CustomerVerification.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
  CircularProgress,
} from '@mui/material';
import api from '../../api';

const CustomerVerification = () => {
  const [pendingCustomers, setPendingCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [verificationNote, setVerificationNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);

  // Fetch pending customer registrations on component mount
  useEffect(() => {
    fetchPendingCustomers();
  }, []);

  const fetchPendingCustomers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin_panel/customers/pending/');
      setPendingCustomers(response.data);
    } catch (error) {
      console.error('Error fetching pending customers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle opening the verification modal with the selected customer's details
  const handleOpenVerificationModal = (customer) => {
    setSelectedCustomer(customer);
    setVerificationModalOpen(true);
  };

  // Handle closing the verification modal
  const handleCloseVerificationModal = () => {
    setSelectedCustomer(null);
    setVerificationModalOpen(false);
    setVerificationNote(''); // Reset note field
  };

  // Handle verifying a customer
  const handleVerifyCustomer = async () => {
    if (!selectedCustomer) return;

    try {
      setLoading(true);
      await api.post(`/admin_panel/customers/${selectedCustomer.id}/verify/`);
      alert('Customer verified successfully!');
      setVerificationModalOpen(false);
      fetchPendingCustomers(); // Refresh the pending list after verification
    } catch (error) {
      console.error('Error verifying customer:', error);
      alert('Failed to verify customer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle rejecting a customer with a note
  const handleRejectCustomer = async () => {
    if (!selectedCustomer || !verificationNote.trim()) {
      alert('Please provide a rejection note.');
      return;
    }

    try {
      setLoading(true);
      await api.post(`/admin_panel/customers/${selectedCustomer.id}/reject/`, {
        note: verificationNote,
      });
      alert('Customer registration rejected successfully!');
      setVerificationModalOpen(false);
      fetchPendingCustomers(); // Refresh the pending list after rejection
    } catch (error) {
      console.error('Error rejecting customer:', error);
      alert('Failed to reject customer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" sx={{ color: '#071A35', fontWeight: 'bold', marginBottom: 3 }}>
        Pending Customer Registrations
      </Typography>

      {/* Table to display pending customer registrations */}
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>NIC Number</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingCustomers.length > 0 ? (
              pendingCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.nic}</TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell>{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#EB293A', color: '#FFFFFF' }}
                      onClick={() => handleOpenVerificationModal(customer)}
                    >
                      Verify
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {loading ? <CircularProgress /> : 'No pending registrations.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Verification Modal */}
      <Dialog open={verificationModalOpen} onClose={handleCloseVerificationModal} fullWidth maxWidth="md">
        <DialogTitle>Verify Customer Registration</DialogTitle>
        <DialogContent>
          {selectedCustomer && (
            <Box sx={{ marginBottom: 4 }}>
              <DialogContentText sx={{ marginBottom: 2 }}>
                Please review the details below and decide whether to verify or reject the customer registration.
              </DialogContentText>
              {/* Display customer details */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1"><strong>Name:</strong> {selectedCustomer.name}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1"><strong>NIC:</strong> {selectedCustomer.nic}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1"><strong>Phone:</strong> {selectedCustomer.phoneNumber}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1"><strong>Email:</strong> {selectedCustomer.email || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1"><strong>Address:</strong> {selectedCustomer.address}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* NIC Front Photo */}
                  <img
                    src={selectedCustomer.nicFrontImageUrl}
                    alt="NIC Front"
                    style={{ width: '100%', border: '1px solid #071A35', borderRadius: '5px' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* NIC Back Photo */}
                  <img
                    src={selectedCustomer.nicBackImageUrl}
                    alt="NIC Back"
                    style={{ width: '100%', border: '1px solid #071A35', borderRadius: '5px' }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <TextField
                    label="Rejection Note (if rejecting)"
                    value={verificationNote}
                    onChange={(e) => setVerificationNote(e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseVerificationModal} variant="outlined" sx={{ color: '#071A35' }}>
            Cancel
          </Button>
          <Button
            onClick={handleRejectCustomer}
            variant="contained"
            sx={{ backgroundColor: '#EB293A', color: '#FFFFFF' }}
            disabled={!selectedCustomer || !verificationNote.trim()}
          >
            Reject
          </Button>
          <Button
            onClick={handleVerifyCustomer}
            variant="contained"
            sx={{ backgroundColor: '#4CAF50', color: '#FFFFFF' }}
            disabled={!selectedCustomer}
          >
            Verify
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CustomerVerification;
