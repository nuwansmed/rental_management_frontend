// src/components/Overview/Widgets/PendingVerificationsWidget.js
import React from 'react';
import { Card, CardContent, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';

const PendingVerificationsWidget = ({ data }) => {
  return (
    <Card sx={{ boxShadow: 2, backgroundColor: '#FFFFFF' }}>
      <CardContent>
        <Typography variant="h6" color="#071A35" gutterBottom>
          Pending Verifications
        </Typography>
        <Typography variant="h4" color="#EB293A" sx={{ fontWeight: 'bold' }}>
          {data.length}
        </Typography>
        <List>
          {data.slice(0, 3).map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={`${user.name} - ${user.nic}`} secondary={`Registered on: ${user.registrationDate}`} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#071A35', color: '#FFFFFF' }}>
            View All Pending Verifications
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PendingVerificationsWidget;
