import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert } from '@mui/material';
import api from '../../../api';

const EditUnitModal = ({ open, onClose, unit, onSave }) => {
  const [serialNumber, setSerialNumber] = useState(unit?.serial_number || '');
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!unit?.id) {
      setError('Invalid ID for editing');
      return;
    }
    try {
      await api.patch(`/inventory/v1/units/${unit.id}/`, { serial_number: serialNumber });
      onSave();
      onClose();
    } catch (error) {
      console.error('Error updating serial number:', error);
      setError('Failed to update serial number.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Serial Number</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Serial Number"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUnitModal;
