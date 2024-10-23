// src/components/AddWarehouseModal.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const AddWarehouseModal = ({ open, handleClose, handleSubmit }) => {
  const [warehouseName, setWarehouseName] = useState('');
  const [warehouseLocation, setWarehouseLocation] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ name: warehouseName, location: warehouseLocation });
    setWarehouseName('');
    setWarehouseLocation('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Warehouse</DialogTitle>
      <DialogContent>
        <TextField
          label="Warehouse Name"
          value={warehouseName}
          onChange={(e) => setWarehouseName(e.target.value)}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Warehouse Location"
          value={warehouseLocation}
          onChange={(e) => setWarehouseLocation(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Add Warehouse
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddWarehouseModal;
