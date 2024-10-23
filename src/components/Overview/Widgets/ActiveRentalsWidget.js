// src/components/Overview/Widgets/ActiveRentalsWidget.js
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';

const ActiveRentalsWidget = ({ data }) => {
  return (
    <Card sx={{ boxShadow: 2, backgroundColor: '#FFFFFF' }}>
      <CardContent>
        <Typography variant="h6" color="#071A35" gutterBottom>
          Active Rentals
        </Typography>
        <Typography variant="h4" color="#EB293A" sx={{ fontWeight: 'bold' }}>
          {data.length}
        </Typography>
        <List>
          {data.slice(0, 3).map((rental) => (
            <ListItem key={rental.id}>
              <ListItemText
                primary={`Rental ID: ${rental.id} - ${rental.machineName}`}
                secondary={`Customer: ${rental.customerName} | Due Date: ${rental.dueDate}`}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#071A35', color: '#FFFFFF' }}>
            View All Active Rentals
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActiveRentalsWidget;
