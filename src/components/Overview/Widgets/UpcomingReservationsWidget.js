// src/components/Overview/Widgets/UpcomingReservationsWidget.js
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';

const UpcomingReservationsWidget = ({ data }) => {
  return (
    <Card sx={{ boxShadow: 2, backgroundColor: '#FFFFFF' }}>
      <CardContent>
        <Typography variant="h6" color="#071A35" gutterBottom>
          Upcoming Reservations
        </Typography>
        <Typography variant="h4" color="#EB293A" sx={{ fontWeight: 'bold' }}>
          {data.length}
        </Typography>
        <List>
          {data.slice(0, 3).map((reservation) => (
            <ListItem key={reservation.id}>
              <ListItemText
                primary={`Reservation ID: ${reservation.id} - ${reservation.machineName}`}
                secondary={`Start Date: ${reservation.startDate} | Customer: ${reservation.customerName}`}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#071A35', color: '#FFFFFF' }}>
            View All Reservations
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UpcomingReservationsWidget;
