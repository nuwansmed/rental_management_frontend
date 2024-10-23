// src/components/Overview/Widgets/RecentCustomerActivityWidget.js
import React from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';

const RecentCustomerActivityWidget = ({ data }) => {
  return (
    <Card sx={{ boxShadow: 2, backgroundColor: '#FFFFFF' }}>
      <CardContent>
        <Typography variant="h6" color="#071A35" gutterBottom>
          Recent Customer Activity
        </Typography>
        <List>
          {data.slice(0, 5).map((activity) => (
            <ListItem key={activity.id}>
              <ListItemText
                primary={`${activity.name} - ${activity.activity}`}
                secondary={`Date: ${activity.date}`}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#071A35', color: '#FFFFFF' }}>
            View All Activity
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentCustomerActivityWidget;
