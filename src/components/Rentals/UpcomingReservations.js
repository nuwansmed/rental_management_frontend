import React, { useState } from 'react';
import { Container, Box, Paper } from '@mui/material';
import RibbonTemplate from '../RibbonTemplate';
import UnderConstruction from '../UnderConstruction'; // Import the UnderConstruction component

const UpcomingReservations = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <RibbonTemplate
        title="Reservations"
        buttonLabel="New Reservation"
        onButtonClick={() => {}}
        tabValue={tabValue}
        onTabChange={handleTabChange}
        tabs={[
          { label: 'Upcoming Reservations' },
          { label: 'Completed Reservations' },
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

export default UpcomingReservations;
