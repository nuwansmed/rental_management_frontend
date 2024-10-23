
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from '@mui/material';
import api from '../../api';

const AddEquipment = () => {
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

  // Fetch initial data on component mount
  useEffect(() => {
    fetchCategories();
    fetchWarehouses();
    fetchPowerSources();
    fetchInitialConditions();
  }, []);

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

  const fetchWarehouses = async () => {
    try {
      const response = await api.get('/admin_panel/inventory/warehouses/');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const fetchPowerSources = async () => {
    try {
      const response = await api.get('/admin_panel/inventory/power-sources/');
      setPowerSources(response.data);
    } catch (error) {
      console.error('Error fetching power sources:', error);
    }
  };

  const fetchInitialConditions = async () => {
    try {
      const response = await api.get('/admin_panel/inventory/initial-conditions/');
      setInitialConditions(response.data);
    } catch (error) {
      console.error('Error fetching initial conditions:', error);
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
      alert('Equipment added successfully!');
      // Reset form
      setFormData({
        industryCategory: '',
        machineType: '',
        brand: '',
        modelNumber: '',
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
        initialCondition: '',
        numberOfUnits: 1,
        serialNumbers: [''],
        insurancePolicyNumber: '',
        insuranceExpirationDate: '',
        warehouseLocation: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error adding equipment:', error);
    }
  };

  return (
    <Container sx={{ marginTop: 4, maxWidth: '800px' }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>Add New Equipment</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Required Fields */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Industry Category</InputLabel>
              <Select
                name="industryCategory"
                value={formData.industryCategory}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Machine Type</InputLabel>
              <Select
                name="machineType"
                value={formData.machineType}
                onChange={handleChange}
                disabled={!formData.industryCategory}
              >
                {machineTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Model Number"
              name="modelNumber"
              value={formData.modelNumber}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Initial Condition</InputLabel>
              <Select
                name="initialCondition"
                value={formData.initialCondition}
                onChange={handleChange}
              >
                {initialConditions.map((condition) => (
                  <MenuItem key={condition.id} value={condition.id}>{condition.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Number of Units"
              name="numberOfUnits"
              type="number"
              value={formData.numberOfUnits}
              onChange={handleNumberOfUnitsChange}
              fullWidth
              inputProps={{ min: 1 }}
            />
          </Grid>

          {formData.serialNumbers.map((serial, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                label={`Serial No. ${index + 1}`}
                value={serial}
                onChange={(e) => handleSerialNumberChange(index, e.target.value)}
                fullWidth
              />
            </Grid>
          ))}
        </Grid>

        {/* Other Optional Fields (Grouped by relevance) */}
        <Typography variant="h6" sx={{ marginTop: 4 }}>Technical & Procurement Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Power Source</InputLabel>
              <Select
                name="powerSource"
                value={formData.powerSource}
                onChange={handleChange}
              >
                {powerSources.map((source) => (
                  <MenuItem key={source.id} value={source.id}>{source.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Power Specifications"
              name="powerSpecifications"
              value={formData.powerSpecifications}
              onChange={handleChange}
              fullWidth
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
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Accessories"
              name="accessories"
              value={formData.accessories}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ marginTop: 4 }}>Supplier & Purchase Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Supplier Name"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Supplier Contact"
              name="supplierContact"
              value={formData.supplierContact}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Invoice/PO Number"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Purchase Cost"
              name="purchaseCost"
              value={formData.purchaseCost}
              onChange={handleChange}
              fullWidth
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Purchase"
              name="dateOfPurchase"
              type="date"
              value={formData.dateOfPurchase}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Warranty Expiration Date"
              name="warrantyExpirationDate"
              type="date"
              value={formData.warrantyExpirationDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ marginTop: 4 }}>Insurance & Location Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Insurance Policy Number"
              name="insurancePolicyNumber"
              value={formData.insurancePolicyNumber}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Insurance Expiration Date"
              name="insuranceExpirationDate"
              type="date"
              value={formData.insuranceExpirationDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Warehouse Location</InputLabel>
              <Select
                name="warehouseLocation"
                value={formData.warehouseLocation}
                onChange={handleChange}
              >
                {warehouses.map((warehouse) => (
                  <MenuItem key={warehouse.id} value={warehouse.id}>{warehouse.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ marginTop: 4 }}>Additional Information</Typography>
        <TextField
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          fullWidth
          multiline
          rows={2}
        />

        <Button type="submit" variant="contained" sx={{ marginTop: 3 }}>
          Add Equipment
        </Button>
      </Box>
    </Container>
  );
};

export default AddEquipment;