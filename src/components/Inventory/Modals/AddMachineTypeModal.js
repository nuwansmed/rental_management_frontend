// src/components/Inventory/AddMachineTypeModal.js
import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

const AddMachineTypeModal = ({
  open, handleClose, machineType, setMachineType, selectedCategory, setSelectedCategory, categories, handleSubmit
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Machine Type</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Machine Type"
          value={machineType}
          onChange={(e) => setMachineType(e.target.value)}
          required
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Machine Type
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMachineTypeModal;
