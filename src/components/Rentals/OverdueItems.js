import React, { useState } from 'react';
import { Container, Box, Paper } from '@mui/material';
import RibbonTemplate from '../RibbonTemplate';
import UnderConstruction from '../UnderConstruction'; // Import the UnderConstruction component

const OverdueItems = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <RibbonTemplate
        title="Overdue Items"
        buttonLabel="Resolve Overdue"
        onButtonClick={() => {}}
        tabValue={tabValue}
        onTabChange={handleTabChange}
        tabs={[
          { label: 'Overdue Rentals' },
          { label: 'Pending Penalties' },
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

export default OverdueItems;
