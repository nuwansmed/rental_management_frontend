// src/components/Overview/Widgets/FinancialSummaryWidget.js
import React from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const FinancialSummaryWidget = ({ data }) => {
  return (
    <Card sx={{ boxShadow: 2, backgroundColor: '#FFFFFF' }}>
      <CardContent>
        <Typography variant="h6" color="#071A35" gutterBottom>
          Financial Summary
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <Typography variant="h4" color="#EB293A" sx={{ fontWeight: 'bold' }}>
            ${data.totalEarnings || 0}
          </Typography>
          <Typography variant="body1" color="#071A35">
            Total Earnings
          </Typography>
        </Box>
        <List>
          <ListItem>
            <ListItemText primary="Outstanding Payments" secondary={`$${data.outstandingPayments || 0}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Rental Revenue" secondary={`$${data.rentalRevenue || 0}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Security Deposits Held" secondary={`$${data.securityDeposits || 0}`} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default FinancialSummaryWidget;
