// src/components/Inventory/AddCategory.js
import React, { useState, useEffect } from 'react';
import {
  Container, Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Typography, Paper, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import api from '../../api';
import RibbonTemplate from '../RibbonTemplate'; // Import RibbonTemplate
import AddCategoryModal from './Modals/AddCategoryModal'; // Import AddCategoryModal

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null); // Store category to edit

  // Fetch categories when component loads
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/admin_panel/inventory/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin_panel/inventory/categories/', { name: categoryName });
      alert('Category added successfully!');
      setCategoryName('');
      fetchCategories(); // Refresh the list
      handleCloseModal();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin_panel/inventory/category/${id}/`);
      alert('Category deleted successfully!');
      fetchCategories(); // Refresh the list
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEditClick = (category) => {
    setEditCategory(category); // Store the category to edit
    setIsEditModalOpen(true);  // Open the edit modal
  };

  const handleEditChange = (e) => {
    setEditCategory({ ...editCategory, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await api.put(`/admin_panel/inventory/category/${editCategory.id}/`, editCategory);
      alert('Category updated successfully!');
      setIsEditModalOpen(false);
      fetchCategories(); // Refresh the list
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleAddCategoryClick = () => {
    setIsModalOpen(true); // Open the add category modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      {/* RibbonTemplate with Add Category Button */}
      <RibbonTemplate
        title="Categories"
        buttonLabel="Add Category"
        onButtonClick={handleAddCategoryClick}
        tabValue={0} // This can be dynamic if you want to use tabs
        onTabChange={() => {}} // No tabs in this case, so no need for onTabChange logic
        tabs={[]} // No tabs, so pass an empty array
      />

      {/* Table of Categories */}
      <Paper elevation={3} sx={{ borderRadius: 2, marginTop: 3, padding: 2 }}>
        <Typography variant="h6" sx={{ color: '#071A35', fontWeight: 'bold', marginBottom: 2 }}>
          Available Categories
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEditClick(category)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(category.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Add Category Modal */}
      <AddCategoryModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        handleSubmit={handleSubmit}
      />

      {/* Edit Category Modal */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Category Name"
            name="name"
            value={editCategory?.name || ''}
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

export default AddCategory;
