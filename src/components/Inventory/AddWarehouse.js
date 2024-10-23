// src/components/AddWarehouse.js
import React, { useState, useEffect } from 'react';
import { Container, Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Paper, Dialog, DialogTitle,DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import api from '../../api';
import { redirectToLogin } from '../../utils/auth';
import RibbonTemplate from '../RibbonTemplate';
import AddWarehouseModal from './Modals/AddWarehouseModal'; // Import the modal

const AddWarehouse = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editWarehouse, setEditWarehouse] = useState(null);

  useEffect(() => {
    fetchWarehouses(); // Fetch initial warehouses on component load
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await api.get('/admin_panel/inventory/warehouses/');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      if (error.response?.status === 401) {
        redirectToLogin();
      }
    }
  };

  const handleAddWarehouse = async (warehouse) => {
    try {
      await api.post('/admin_panel/inventory/warehouses/', warehouse);
      alert('Warehouse added successfully!');
      fetchWarehouses(); // Refresh the list
      setIsModalOpen(false); // Close modal after adding
    } catch (error) {
      console.error('Error adding warehouse:', error);
      if (error.response?.status === 401) {
        redirectToLogin();
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin_panel/inventory/warehouse/${id}/`);
      alert('Warehouse deleted successfully!');
      fetchWarehouses();
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      if (error.response?.status === 401) {
        redirectToLogin();
      }
    }
  };

  const handleEditClick = (warehouse) => {
    setEditWarehouse(warehouse);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditWarehouse({ ...editWarehouse, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await api.put(`/admin_panel/inventory/warehouse/${editWarehouse.id}/`, editWarehouse);
      alert('Warehouse updated successfully!');
      setIsEditModalOpen(false);
      fetchWarehouses();
    } catch (error) {
      console.error('Error updating warehouse:', error);
      if (error.response?.status === 401) {
        redirectToLogin();
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      {/* Ribbon Template for Warehouse Management */}
      <RibbonTemplate
        title="Warehouses"
        buttonLabel="Add Warehouse"
        onButtonClick={() => setIsModalOpen(true)} // Open modal on button click
        tabValue={0}
        onTabChange={() => {}} // No tabs for now, so no tab switching logic
        tabs={[]} // Empty tabs array, no tabs needed for Warehouses
      />

      {/* Render Warehouse Table */}
      <Paper elevation={3} sx={{ borderRadius: 2, marginTop: 3, padding: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Warehouse Name</TableCell>
              <TableCell>Warehouse Location</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouses.map((warehouse) => (
              <TableRow key={warehouse.id}>
                <TableCell>{warehouse.name}</TableCell>
                <TableCell>{warehouse.location}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEditClick(warehouse)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(warehouse.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Add Warehouse Modal */}
      <AddWarehouseModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} handleSubmit={handleAddWarehouse} />

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Edit Warehouse</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Warehouse Name"
            name="name"
            value={editWarehouse?.name || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            label="Warehouse Location"
            name="location"
            value={editWarehouse?.location || ''}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddWarehouse;
