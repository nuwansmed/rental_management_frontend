// src/components/Rentals/MachineSelectionDialog.js
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  TextField,
  Button,
} from '@mui/material';

const MachineSelectionDialog = ({
  open,
  onClose,
  onAddMachine,
  machines,
}) => {
  // State variables for filters and selections
  const [category, setCategory] = useState('');
  const [machineType, setMachineType] = useState('');
  const [condition, setCondition] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);

  // Rental details state
  const [rentalType, setRentalType] = useState('Hourly');
  const [rentalStartDate, setRentalStartDate] = useState('');
  const [rentalEndDate, setRentalEndDate] = useState('');
  const [rentalDuration, setRentalDuration] = useState('');
  const [totalCharge, setTotalCharge] = useState(0);
  const [notes, setNotes] = useState('');

  // Update filtered machines when filters change
  useEffect(() => {
    let filtered = machines;
    if (category) filtered = filtered.filter(machine => machine.category === category);
    if (machineType) filtered = filtered.filter(machine => machine.type === machineType);
    if (condition) filtered = filtered.filter(machine => machine.condition === condition);
    if (warehouse) filtered = filtered.filter(machine => machine.warehouse === warehouse);
    setFilteredMachines(filtered);
  }, [category, machineType, condition, warehouse, machines]);

  // Calculate rental duration and total charge
  useEffect(() => {
    if (rentalStartDate && rentalEndDate && selectedMachine) {
      const start = new Date(rentalStartDate);
      const end = new Date(rentalEndDate);
      const durationInMs = end - start;
      let duration;
      let rate;

      if (rentalType === 'Hourly') {
        duration = durationInMs / (1000 * 3600);
        rate = selectedMachine.rentalRates.hourly;
      } else if (rentalType === 'Daily') {
        duration = durationInMs / (1000 * 3600 * 24);
        rate = selectedMachine.rentalRates.daily;
      } else {
        duration = durationInMs / (1000 * 3600 * 24 * 7);
        rate = selectedMachine.rentalRates.weekly;
      }

      setRentalDuration(duration.toFixed(2));
      setTotalCharge((duration * rate).toFixed(2));
    }
  }, [rentalStartDate, rentalEndDate, rentalType, selectedMachine]);

  const handleAddMachineToOrder = () => {
    const machineWithDetails = {
      machine: selectedMachine,
      rentalType,
      rentalStartDate,
      rentalEndDate,
      rentalDuration,
      totalCharge,
      notes,
    };
    onAddMachine(machineWithDetails);
    // Reset the form
    setSelectedMachine(null);
    setRentalType('Hourly');
    setRentalStartDate('');
    setRentalEndDate('');
    setRentalDuration('');
    setTotalCharge(0);
    setNotes('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Select a Machine to Add</DialogTitle>
      <DialogContent>
        {/* Advanced Search Filters */}
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
          {/* Category Filter */}
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Power Tools">Power Tools</MenuItem>
              <MenuItem value="Construction Equipment">Construction Equipment</MenuItem>
              <MenuItem value="Woodworking Equipment">Woodworking Equipment</MenuItem>
              <MenuItem value="Agricultural Equipment">Agricultural Equipment</MenuItem>
              <MenuItem value="Electrical Accessories">Electrical Accessories</MenuItem>
            </Select>
          </FormControl>
          {/* Machine Type Filter */}
          <FormControl fullWidth>
            <InputLabel>Machine Type</InputLabel>
            <Select value={machineType} onChange={(e) => setMachineType(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {/* Dynamically populate based on category if needed */}
              <MenuItem value="Drill">Drill</MenuItem>
              <MenuItem value="Saw">Saw</MenuItem>
              <MenuItem value="Excavator">Excavator</MenuItem>
            </Select>
          </FormControl>
          {/* Condition Filter */}
          <FormControl fullWidth>
            <InputLabel>Condition</InputLabel>
            <Select value={condition} onChange={(e) => setCondition(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="Fair">Fair</MenuItem>
            </Select>
          </FormControl>
          {/* Warehouse Filter */}
          <FormControl fullWidth>
            <InputLabel>Warehouse</InputLabel>
            <Select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Warehouse A">Warehouse A</MenuItem>
              <MenuItem value="Warehouse B">Warehouse B</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Machine Selection */}
        <FormControl fullWidth sx={{ marginBottom: 3 }}>
          <InputLabel>Select Machine</InputLabel>
          <Select
            value={selectedMachine ? selectedMachine.id : ''}
            onChange={(e) => {
              const machine = machines.find((mach) => mach.id === e.target.value);
              setSelectedMachine(machine);
            }}
          >
            {filteredMachines.map((machine) => (
              <MenuItem key={machine.id} value={machine.id}>
                {machine.name} - {machine.serialNumber}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Rental Details Section */}
        {selectedMachine && (
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" sx={{ color: '#071A35', fontWeight: 'bold' }}>
              Rental Details for {selectedMachine.name}
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Rental Type</InputLabel>
              <Select value={rentalType} onChange={(e) => setRentalType(e.target.value)}>
                <MenuItem value="Hourly">Hourly</MenuItem>
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
              </Select>
            </FormControl>

            {/* Rental Rate and Duration */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Rental Rate"
                  value={`$${selectedMachine.rentalRates[rentalType.toLowerCase()]} per ${rentalType}`}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Total Charge"
                  value={`$${totalCharge}`}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>

            {/* Start and End Date */}
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={6}>
                <TextField
                  type="datetime-local"
                  label="Start Date and Time"
                  value={rentalStartDate}
                  onChange={(e) => setRentalStartDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="datetime-local"
                  label="End Date and Time"
                  value={rentalEndDate}
                  onChange={(e) => setRentalEndDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            {/* Notes Section */}
            <TextField
              label="Notes"
              name="notes"
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              fullWidth
              sx={{ marginTop: 3 }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleAddMachineToOrder}
          variant="contained"
          sx={{ backgroundColor: '#EB293A', color: '#FFFFFF' }}
          disabled={!selectedMachine}
        >
          Add to Order
        </Button>
        <Button onClick={onClose} variant="outlined" sx={{ color: '#071A35' }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MachineSelectionDialog;
