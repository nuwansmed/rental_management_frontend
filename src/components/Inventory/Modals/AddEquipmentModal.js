// src/components/AddEquipmentModal.js

import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import Loader from '../../Loader'; // Import your Loader component
import CloseIcon from '@mui/icons-material/Close';
import api from '../../../api';

const AddEquipmentModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    industryCategory: '',
    machineType: '',
    brand: '',
    modelNumber: '',
    initialCondition: '',
    numberOfUnits: 1,
    serialNumbers: [''],
    powerSource: '',
    powerSpecifications: '',
    machineDescription: '',
    accessories: '',
    supplierName: '',
    supplierContact: '',
    invoiceNumber: '',
    purchaseCost: '',
    dateOfPurchase: '',
    warrantyExpirationDate: '',
    insurancePolicyNumber: '',
    insuranceExpirationDate: '',
    warehouseLocation: '',
    notes: '',
  });

  // State variables for dropdown options
  const [categories, setCategories] = useState([]);
  const [machineTypes, setMachineTypes] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [powerSources, setPowerSources] = useState([]);
  const [initialConditions, setInitialConditions] = useState([]);
  const [loading, setLoading] = useState(false); 

  // State for alerts
  const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' });

  // Fetch initial data on component mount
  useEffect(() => {
    if (open) {
      fetchCategories();
      fetchWarehouses();
      fetchPowerSources();
      fetchInitialConditions();
    }
    // Reset form when modal closes
    if (!open) {
      setFormData({
        industryCategory: '',
        machineType: '',
        brand: '',
        modelNumber: '',
        initialCondition: '',
        numberOfUnits: 1,
        serialNumbers: [''],
        powerSource: '',
        powerSpecifications: '',
        machineDescription: '',
        accessories: '',
        supplierName: '',
        supplierContact: '',
        invoiceNumber: '',
        purchaseCost: '',
        dateOfPurchase: '',
        warrantyExpirationDate: '',
        insurancePolicyNumber: '',
        insuranceExpirationDate: '',
        warehouseLocation: '',
        notes: '',
      });
      setMachineTypes([]);
    }
  }, [open]);

  // Fetch machine types when industry category changes
  useEffect(() => {
    if (formData.industryCategory) {
      fetchMachineTypes(formData.industryCategory);
    } else {
      setMachineTypes([]);
    }
  }, [formData.industryCategory]);

  // Fetch functions
  const fetchCategories = async () => {
    try {
      const response = await api.get('/admin_panel/inventory/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setAlert({ open: true, severity: 'error', message: 'Failed to fetch categories.' });
    }
  };

  const fetchMachineTypes = async (categoryId) => {
    try {
      const response = await api.get(`/admin_panel/inventory/machine-types/?category=${categoryId}`);
      setMachineTypes(response.data);
    } catch (error) {
      console.error('Error fetching machine types:', error);
      setAlert({ open: true, severity: 'error', message: 'Failed to fetch machine types.' });
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await api.get('/admin_panel/inventory/warehouses/');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      setAlert({ open: true, severity: 'error', message: 'Failed to fetch warehouses.' });
    }
  };

  const fetchPowerSources = async () => {
    try {
      const response = await api.get('/admin_panel/inventory/power-sources/');
      setPowerSources(response.data);
    } catch (error) {
      console.error('Error fetching power sources:', error);
      setAlert({ open: true, severity: 'error', message: 'Failed to fetch power sources.' });
    }
  };

  const fetchInitialConditions = async () => {
    try {
      const response = await api.get('/admin_panel/inventory/initial-conditions/');
      setInitialConditions(response.data);
    } catch (error) {
      console.error('Error fetching initial conditions:', error);
      setAlert({ open: true, severity: 'error', message: 'Failed to fetch initial conditions.' });
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Reset machine type if industry category changes
    if (name === 'industryCategory') {
      setFormData({ ...formData, [name]: value, machineType: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle serial number inputs
  const handleSerialNumberChange = (index, value) => {
    const updatedSerialNumbers = [...formData.serialNumbers];
    updatedSerialNumbers[index] = value;
    setFormData({ ...formData, serialNumbers: updatedSerialNumbers });
  };

  // Handle number of units change
  const handleNumberOfUnitsChange = (e) => {
    const units = Math.max(1, parseInt(e.target.value, 10) || 1);
    const serialNumbers = Array(units).fill('');
    setFormData({ ...formData, numberOfUnits: units, serialNumbers });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      industry_category: formData.industryCategory,
      machine_type: formData.machineType,
      brand: formData.brand,
      model_number: formData.modelNumber,
      initial_condition: formData.initialCondition,
      warehouse_location: formData.warehouseLocation,
      number_of_units: formData.numberOfUnits,
      serial_numbers: formData.serialNumbers,
      power_source: formData.powerSource || null,  // Set to null if empty
      power_specifications: formData.powerSpecifications || null,
      machine_description: formData.machineDescription || null,
      accessories: formData.accessories || null,
      supplier_name: formData.supplierName || null,
      supplier_contact: formData.supplierContact || null,
      invoice_number: formData.invoiceNumber || null,
      purchase_cost: formData.purchaseCost || null,
      date_of_purchase: formData.dateOfPurchase || null,  // Set date fields to null if empty
      warranty_expiration_date: formData.warrantyExpirationDate || null,
      insurance_policy_number: formData.insurancePolicyNumber || null,
      insurance_expiration_date: formData.insuranceExpirationDate || null,
      notes: formData.notes || null,
    };

    try {
      await api.post('/inventory/v1/batches/', dataToSend);
      setAlert({ open: true, severity: 'success', message: 'Equipment added successfully!' });
      handleClose(); // Close modal after successful submission
    } catch (error) {
      console.error('Error adding equipment:', error);
      setAlert({ open: true, severity: 'error', message: 'Failed to add equipment.' });
    }
    finally {
      setLoading(false);  // Hide the loader after submission is complete
    }
  };

  // Handle Alert Close
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-equipment-modal-title"
        aria-describedby="add-equipment-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
            overflowY: 'auto',
          }}
        >
          {loading && (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 2,
      }}
    >
      <Loader />
    </Box>
  )}
          {/* Modal Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography id="add-equipment-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#071A35' }}>
              Add New Equipment
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            {/* Basic Information Section */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#071A35' }}>
              Basic Information
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12}>
                <FormControl fullWidth required size="small">
                  <InputLabel>Industry Category</InputLabel>
                  <Select
                    name="industryCategory"
                    value={formData.industryCategory}
                    onChange={handleChange}
                    label="Industry Category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required size="small" disabled={!formData.industryCategory}>
                  <InputLabel>Machine Type</InputLabel>
                  <Select
                    name="machineType"
                    value={formData.machineType}
                    onChange={handleChange}
                    label="Machine Type"
                  >
                    {machineTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  fullWidth
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Model Number"
                  name="modelNumber"
                  value={formData.modelNumber}
                  onChange={handleChange}
                  required
                  fullWidth
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required size="small">
                  <InputLabel>Initial Condition</InputLabel>
                  <Select
                    name="initialCondition"
                    value={formData.initialCondition}
                    onChange={handleChange}
                    label="Initial Condition"
                  >
                    {initialConditions.map((condition) => (
                      <MenuItem key={condition.id} value={condition.id}>{condition.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Number of Units"
                  name="numberOfUnits"
                  type="number"
                  value={formData.numberOfUnits}
                  onChange={handleNumberOfUnitsChange}
                  fullWidth
                  size="small"
                  inputProps={{ min: 1 }}
                  sx={{ mb: 1 }}
                />
              </Grid>

              {formData.serialNumbers.map((serial, index) => (
                <Grid item xs={12} key={index}>
                  <TextField
                    label={`Serial No. ${index + 1}`}
                    value={serial}
                    onChange={(e) => handleSerialNumberChange(index, e.target.value)}
                    fullWidth
                    size="small"
                    sx={{ mb: 1 }}
                    required
                  />
                </Grid>
              ))}
            </Grid>

            {/* Technical & Procurement Details Section */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#071A35' }}>
              Technical & Procurement Details
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Power Source</InputLabel>
                  <Select
                    name="powerSource"
                    value={formData.powerSource}
                    onChange={handleChange}
                    label="Power Source"
                  >
                    {powerSources.map((source) => (
                      <MenuItem key={source.id} value={source.id}>{source.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Power Specifications"
                  name="powerSpecifications"
                  value={formData.powerSpecifications}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Machine Description"
                  name="machineDescription"
                  value={formData.machineDescription}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={2}
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Accessories"
                  name="accessories"
                  value={formData.accessories}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Grid>
            </Grid>

            {/* Supplier & Purchase Details Section */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#071A35' }}>
              Supplier & Purchase Details
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12}>
                <TextField
                  label="Supplier Name"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Supplier Contact"
                  name="supplierContact"
                  value={formData.supplierContact}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Invoice/PO Number"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Purchase Cost"
                  name="purchaseCost"
                  type="number"
                  value={formData.purchaseCost}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{ mb: 1 }}
                  inputProps={{ min: 0, step: '0.01' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Date of Purchase"
                  name="dateOfPurchase"
                  type="date"
                  value={formData.dateOfPurchase}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Warranty Expiration Date"
                  name="warrantyExpirationDate"
                  type="date"
                  value={formData.warrantyExpirationDate}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 1 }}
                />
              </Grid>
            </Grid>

            {/* Insurance & Location Details Section */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#071A35' }}>
              Insurance & Location Details
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12}>
                <TextField
                  label="Insurance Policy Number"
                  name="insurancePolicyNumber"
                  value={formData.insurancePolicyNumber}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Insurance Expiration Date"
                  name="insuranceExpirationDate"
                  type="date"
                  value={formData.insuranceExpirationDate}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Warehouse Location</InputLabel>
                  <Select
                    name="warehouseLocation"
                    value={formData.warehouseLocation}
                    onChange={handleChange}
                    label="Warehouse Location"
                  >
                    {warehouses.map((warehouse) => (
                      <MenuItem key={warehouse.id} value={warehouse.id}>{warehouse.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Additional Information Section */}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#071A35' }}>
              Additional Information
            </Typography>
            <TextField
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
              size="small"
              sx={{ mb: 3 }}
            />

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Equipment
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddEquipmentModal;
