// src/components/EditBatchModal.js

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import api from '../../../api';

const EditBatchModal = ({ open, onClose, batch }) => {
  const [formData, setFormData] = useState({
    brand: batch.brand,
    modelNumber: batch.model_number,
    industryCategory: batch.industry_category,
    machineType: batch.machine_type,
    powerSource: batch.power_source,
    powerSpecifications: batch.power_specifications,
    machineDescription: batch.machine_description,
    accessories: batch.accessories,
    supplierName: batch.supplier_name,
    supplierContact: batch.supplier_contact,
    invoiceNumber: batch.invoice_number,
    purchaseCost: batch.purchase_cost,
    dateOfPurchase: batch.date_of_purchase,
    warrantyExpirationDate: batch.warranty_expiration_date,
    insurancePolicyNumber: batch.insurance_policy_number,
    insuranceExpirationDate: batch.insurance_expiration_date,
    initialCondition: batch.initial_condition,
    warehouseLocation: batch.warehouse_location,
    notes: batch.notes,
  });

  const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' });
  const [categories, setCategories] = useState([]);
  const [machineTypes, setMachineTypes] = useState([]);
  const [powerSources, setPowerSources] = useState([]);
  const [initialConditions, setInitialConditions] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchPowerSources();
    fetchInitialConditions();
    fetchWarehouses();
    fetchMachineTypes(batch.industry_category);
  }, [batch]);

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

  const fetchWarehouses = async () => {
    try {
      const response = await api.get('/admin_panel/inventory/warehouses/');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await api.patch(`/inventory/v1/batches/${batch.id}/`, {
        ...formData,
        model_number: formData.modelNumber,
      });
      setAlert({ open: true, severity: 'success', message: 'Batch updated successfully!' });
      onClose();
    } catch (error) {
      setAlert({ open: true, severity: 'error', message: 'Failed to update batch.' });
      console.error('Error updating batch:', error);
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Batch</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Model Number"
                name="modelNumber"
                value={formData.modelNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Industry Category</InputLabel>
                <Select
                  name="industryCategory"
                  value={formData.industryCategory}
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Machine Type</InputLabel>
                <Select
                  name="machineType"
                  value={formData.machineType}
                  onChange={handleChange}
                >
                  {machineTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Power Source</InputLabel>
                <Select
                  name="powerSource"
                  value={formData.powerSource}
                  onChange={handleChange}
                >
                  {powerSources.map((source) => (
                    <MenuItem key={source.id} value={source.id}>
                      {source.name}
                    </MenuItem>
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
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Machine Description"
                name="machineDescription"
                value={formData.machineDescription}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Accessories"
                name="accessories"
                value={formData.accessories}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Supplier Name"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Supplier Contact"
                name="supplierContact"
                value={formData.supplierContact}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Invoice Number"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Purchase Cost"
                name="purchaseCost"
                value={formData.purchaseCost}
                onChange={handleChange}
                fullWidth
                type="number"
                margin="normal"
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
                InputLabelProps={{ shrink: true }}
                margin="normal"
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
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Insurance Policy Number"
                name="insurancePolicyNumber"
                value={formData.insurancePolicyNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
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
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Initial Condition</InputLabel>
                <Select
                  name="initialCondition"
                  value={formData.initialCondition}
                  onChange={handleChange}
                >
                  {initialConditions.map((condition) => (
                    <MenuItem key={condition.id} value={condition.id}>
                      {condition.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Warehouse Location</InputLabel>
                <Select
                  name="warehouseLocation"
                  value={formData.warehouseLocation}
                  onChange={handleChange}
                >
                  {warehouses.map((warehouse) => (
                    <MenuItem key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

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

export default EditBatchModal;
