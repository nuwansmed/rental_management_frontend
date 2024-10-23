// src/components/Rentals/FinancialDetails.js
import React, { useEffect } from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';

const FinancialDetails = ({
  rentedMachines,
  securityDeposit,
  setSecurityDeposit,
  discount,
  setDiscount,
  totalCharge,
  setTotalCharge,
  totalAmountDue,
  setTotalAmountDue,
}) => {
  // Calculate total charges whenever rentedMachines changes
  useEffect(() => {
    const totalCharges = rentedMachines.reduce(
      (sum, item) => sum + parseFloat(item.totalCharge),
      0
    );
    setTotalCharge(totalCharges.toFixed(2));
  }, [rentedMachines, setTotalCharge]);

  // Calculate total amount due whenever totalCharge, securityDeposit, or discount changes
  useEffect(() => {
    const total =
      parseFloat(totalCharge) +
      parseFloat(securityDeposit) -
      parseFloat(discount);
    setTotalAmountDue(total > 0 ? total.toFixed(2) : '0.00');
  }, [totalCharge, securityDeposit, discount, setTotalAmountDue]);

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography
        variant="h6"
        sx={{ color: '#071A35', fontWeight: 'bold', marginBottom: 2 }}
      >
        Financial Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Security Deposit"
            type="number"
            value={securityDeposit}
            onChange={(e) => setSecurityDeposit(Number(e.target.value))}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Discount"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Total Payment Summary"
            value={`Total Charges: $${totalCharge}, Security Deposit: $${securityDeposit}, Discount: $${discount}, Total Amount Due: $${totalAmountDue}`}
            fullWidth
            InputProps={{ readOnly: true }}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinancialDetails;
