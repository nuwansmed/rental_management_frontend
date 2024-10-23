// src/components/Inventory/AddMachineType.js
import React, { useState, useEffect } from 'react';
import {
  Container, Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Typography, Paper, Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, DialogActions, Button
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import api from '../../api';
import RibbonTemplate from '../RibbonTemplate'; // Import RibbonTemplate
import AddMachineTypeModal from './Modals/AddMachineTypeModal'; // Import AddMachineTypeModal

const AddMachineType = () => {
  const [machineType, setMachineType] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [machineTypes, setMachineTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editMachineType, setEditMachineType] = useState(null); // Store machine type to edit

  // Fetch categories and machine types on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchMachineTypes(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/admin_panel/inventory/categories/');
      setCategories(response.data);
      if (response.data.length > 0) {
        setSelectedCategory(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchMachineTypes = async (categoryId) => {
    try {
      const response = await api.get(`/admin_panel/inventory/machine-types/?category=${categoryId}`);
      setMachineTypes(response.data);
    } catch (error) {
      console.error('Error fetching machine types:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin_panel/inventory/machine-types/', {
        name: machineType,
        category: selectedCategory,
      });
      alert('Machine added successfully!');
      setMachineType('');
      fetchMachineTypes(selectedCategory);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding machine:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin_panel/inventory/machine-type/${id}/delete/`);
      alert('Machine deleted successfully!');
      fetchMachineTypes(selectedCategory);
    } catch (error) {
      console.error('Error deleting machine type:', error);
    }
  };

  const handleEditClick = (type) => {
    setEditMachineType(type);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditMachineType((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      await api.put(`/admin_panel/inventory/machine-type/${editMachineType.id}/`, editMachineType);
      alert('Machine updated successfully!');
      setIsEditModalOpen(false);
      fetchMachineTypes(selectedCategory);
    } catch (error) {
      console.error('Error updating machine type:', error);
    }
  };

  const handleAddMachineClick = () => {
    setIsModalOpen(true); // Open the modal for adding machine type
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      {/* RibbonTemplate with Add Machine Type Button */}
      <RibbonTemplate
        title="Machines"
        buttonLabel="Add Machine"
        onButtonClick={handleAddMachineClick}
        tabValue={0} // No tabs in this component
        onTabChange={() => {}} // No tabs, so no need for onTabChange logic
        tabs={[]} // No tabs, so pass an empty array
      />

      {/* Table of Machine Types */}
      <Paper elevation={3} sx={{ borderRadius: 2, marginTop: 3, padding: 2 }}>
        <Typography variant="h6" sx={{ color: '#071A35', fontWeight: 'bold', marginBottom: 2 }}>
          Available Machines
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Machine </TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {machineTypes.map((type) => (
              <TableRow key={type.id}>
                <TableCell>{type.name}</TableCell>
                <TableCell>{type.category_name}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEditClick(type)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(type.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Add Machine Type Modal */}
      <AddMachineTypeModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        machineType={machineType}
        setMachineType={setMachineType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        handleSubmit={handleSubmit}
      />

      {/* Edit Machine Type Modal */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Edit Machine Type</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Machine Type"
            name="name"
            value={editMachineType?.name || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={editMachineType?.category || ''}
              onChange={handleEditChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default AddMachineType;
