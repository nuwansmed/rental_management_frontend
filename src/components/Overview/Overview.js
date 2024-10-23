import React from 'react';
import { Container, Box, Typography, Grid, Paper } from '@mui/material';
import { Dashboard, Build, People, Assignment } from '@mui/icons-material';

const Overview = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#071A35', marginBottom: 2 }}>
          Welcome to Oku Rentals!
        </Typography>
        <Typography variant="h6" sx={{ color: '#495156' }}>
          Manage your inventory, rentals, and customers effortlessly.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Inventory Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 2 }}>
            <Build sx={{ fontSize: 50, color: '#1976d2', marginBottom: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#071A35' }}>
              Inventory
            </Typography>
            <Typography variant="body2" sx={{ color: '#495156', marginTop: 1 }}>
              Track and manage all the equipment in your inventory, including units and batches.
            </Typography>
          </Paper>
        </Grid>

        {/* Rentals Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 2 }}>
            <Assignment sx={{ fontSize: 50, color: '#1976d2', marginBottom: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#071A35' }}>
              Rentals
            </Typography>
            <Typography variant="body2" sx={{ color: '#495156', marginTop: 1 }}>
              Create new rentals, track active rentals, and manage overdue items.
            </Typography>
          </Paper>
        </Grid>

        {/* Customers Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 2 }}>
            <People sx={{ fontSize: 50, color: '#1976d2', marginBottom: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#071A35' }}>
              Customers
            </Typography>
            <Typography variant="body2" sx={{ color: '#495156', marginTop: 1 }}>
              Manage your customer base, add new customers, and verify identities.
            </Typography>
          </Paper>
        </Grid>

        {/* Dashboard Section */}
        
      </Grid>
    </Container>
  );
};

export default Overview;
