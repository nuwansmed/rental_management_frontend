// src/components/Customers/Customers.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  InputAdornment,
  CircularProgress,
  IconButton,
} from '@mui/material';

import api from '../../api';
import RibbonTemplate from '../RibbonTemplate';
import AddCustomerModal from './Modals/AddCustomerModal';
import EditCustomerDialog from './EditCustomerDialog';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import CustomersTable from './CustomersTable'; // Import the new CustomersTable component

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [loading, setLoading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/customers/v1/');
      setCustomers(response.data);
      setFilteredCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  

  const handleAddCustomerClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddCustomerSave = async (formData) => {
    try {
      await api.post('/customers/v1/', formData);
      alert('Customer added successfully!');
      fetchCustomers();
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Failed to add customer.');
    }
  };

  const handleEditCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setEditDialogOpen(true);
  };

  const handleEditCustomerSave = async (formData) => {
    if (!selectedCustomer) return;

    const updatedData = { ...formData };
    if (updatedData.password === '') {
      delete updatedData.password;
    }

    const formDataToSend = new FormData();
    for (const key in updatedData) {
      if (updatedData[key]) {
        formDataToSend.append(key, updatedData[key]);
      }
    }

    try {
      await api.patch(`/customers/v1/${selectedCustomer.id}/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Customer updated successfully!');
      fetchCustomers();
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Failed to update customer.');
    } finally {
      setEditDialogOpen(false);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    try {
      await api.delete(`/customers/v1/${customerId}/`);
      alert('Customer deleted successfully!');
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Failed to delete customer.');
    }
  };

  const handleViewImages = (nicFront, nicBack) => {
    const images = [];
    if (nicFront) images.push(nicFront);
    if (nicBack) images.push(nicBack);

    setLightboxImages(images);
    setLightboxOpen(true);
    setPhotoIndex(0);
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      {/* Ribbon Template */}
      <RibbonTemplate
        title="Customers"
        buttonLabel="Add Customer"
        onButtonClick={handleAddCustomerClick}
        tabValue={0} // No tabs in this component
        onTabChange={() => {}} // No tabs in this case
        tabs={[]} // Empty tabs array
      />

      

      {/* Customers Table */}
      <CustomersTable
        customers={customers}
        filteredCustomers={filteredCustomers}
        loading={loading}
        handleEditCustomerClick={handleEditCustomerClick}
        handleDeleteCustomer={handleDeleteCustomer}
        handleViewImages={handleViewImages}
      />

      {/* Add Customer Modal */}
      <AddCustomerModal
        open={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
        handleSave={handleAddCustomerSave}
      />

      {/* Edit Customer Dialog */}
      {selectedCustomer && (
        <EditCustomerDialog
          open={editDialogOpen}
          handleClose={() => setEditDialogOpen(false)}
          customer={selectedCustomer}
          handleSave={handleEditCustomerSave}
        />
      )}

      {/* Lightbox for Images */}
      {lightboxOpen && (
        <Lightbox
          mainSrc={lightboxImages[photoIndex]}
          nextSrc={lightboxImages[(photoIndex + 1) % lightboxImages.length]}
          prevSrc={lightboxImages[(photoIndex + lightboxImages.length - 1) % lightboxImages.length]}
          onCloseRequest={() => setLightboxOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + lightboxImages.length - 1) % lightboxImages.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % lightboxImages.length)}
        />
      )}
    </Container>
  );
};

export default Customers;
