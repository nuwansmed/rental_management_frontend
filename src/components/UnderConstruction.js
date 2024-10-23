import React from 'react';
import { Box, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction'; // Optional Icon for under construction

const UnderConstruction = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        backgroundColor: '#f7f7f7',
      }}
    >
      {/* Optional: Construction Icon */}
      <ConstructionIcon
        sx={{
          fontSize: 80,
          color: '#f57c00',
          marginBottom: 2,
        }}
      />

      {/* Main Message */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', marginBottom: 1, color: '#333' }}
      >
        Page Under Construction
      </Typography>

      {/* Sub Message */}
      <Typography variant="body1" sx={{ color: '#666' }}>
        We are working hard to bring you this feature. Stay tuned!
      </Typography>
    </Box>
  );
};

export default UnderConstruction;
