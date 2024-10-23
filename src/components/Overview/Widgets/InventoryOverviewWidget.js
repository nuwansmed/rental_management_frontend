// src/components/Overview/Widgets/InventoryOverviewWidget.js
import React from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const InventoryOverviewWidget = ({ data }) => {
  return (
    <Card sx={{ boxShadow: 2, backgroundColor: '#FFFFFF' }}>
      <CardContent>
        <Typography variant="h6" color="#071A35" gutterBottom>
          Inventory Overview
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <Typography variant="h4" color="#EB293A" sx={{ fontWeight: 'bold' }}>
            {data.totalMachines || 0}
          </Typography>
          <Typography variant="body1" color="#071A35">
            Total Machines
          </Typography>
        </Box>
        <List>
          <ListItem>
            <ListItemText primary="Available Machines" secondary={data.available || 0} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Rented Machines" secondary={data.rented || 0} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Under Maintenance" secondary={data.maintenance || 0} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Retired Machines" secondary={data.retired || 0} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default InventoryOverviewWidget;
