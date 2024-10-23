// src/components/Inventory/AddCategoryModal.js
import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button
} from '@mui/material';

const AddCategoryModal = ({ open, handleClose, categoryName, setCategoryName, handleSubmit }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          fullWidth
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Add Category</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryModal;
