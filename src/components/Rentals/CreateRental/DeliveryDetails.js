// src/components/Rentals/DeliveryDetails.js
import React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  TextField,
} from '@mui/material';

const DeliveryDetails = ({
  deliveryRequired,
  setDeliveryRequired,
  deliveryAddress,
  setDeliveryAddress,
  deliveryDate,
  setDeliveryDate,
}) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography
        variant="h6"
        sx={{ color: '#071A35', fontWeight: 'bold', marginBottom: 2 }}
      >
        Delivery Details
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={deliveryRequired}
            onChange={(e) => setDeliveryRequired(e.target.checked)}
          />
        }
        label="Delivery Required"
      />

      {deliveryRequired && (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
            <TextField
              label="Delivery Address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="date"
              label="Expected Delivery Date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DeliveryDetails;
