import React, { useState } from 'react';
import { Container, Box, Paper } from '@mui/material';
import RibbonTemplate from '../RibbonTemplate';
import UnderConstruction from '../UnderConstruction'; // Import the UnderConstruction component

const ActiveRentals = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <RibbonTemplate
        title="Rentals"
        buttonLabel="Add Rental"
        onButtonClick={() => {}}
        tabValue={tabValue}
        onTabChange={handleTabChange}
        tabs={[
          { label: 'Current Rentals' },
          { label: 'History' },
        ]}
      />

      <Paper elevation={3} sx={{ borderRadius: 2, marginTop: 3, padding: 2 }}>
        <Box>
          <UnderConstruction /> {/* Use the UnderConstruction component */}
        </Box>
      </Paper>
    </Container>
  );
};

export default ActiveRentals;
