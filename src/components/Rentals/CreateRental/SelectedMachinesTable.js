// src/components/Rentals/SelectedMachinesTable.js
import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from '@mui/material';

const SelectedMachinesTable = ({ rentedMachines, handleRemoveMachine }) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6" sx={{ color: '#071A35', fontWeight: 'bold', marginBottom: 2 }}>
        Selected Machines
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Machine Name</TableCell>
            <TableCell>Model Number</TableCell>
            <TableCell>Serial Number</TableCell>
            <TableCell>Rental Type</TableCell>
            <TableCell>Rental Duration</TableCell>
            <TableCell>Total Charge</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rentedMachines.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.machine.name}</TableCell>
              <TableCell>{item.machine.modelNumber}</TableCell>
              <TableCell>{item.machine.serialNumber}</TableCell>
              <TableCell>{item.rentalType}</TableCell>
              <TableCell>
                {item.rentalStartDate} to {item.rentalEndDate} ({item.rentalDuration}{' '}
                {item.rentalType === 'Hourly'
                  ? 'hours'
                  : item.rentalType === 'Daily'
                  ? 'days'
                  : 'weeks'}
                )
              </TableCell>
              <TableCell>${item.totalCharge}</TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => handleRemoveMachine(index)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default SelectedMachinesTable;
