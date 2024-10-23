import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import outerCircle from '../assets/outer_circle.svg';
import innerCircle from '../assets/inner_circle.svg';

// Define the keyframes for the rotation
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        position: 'relative', // Container is relative to position children
        width: '200px',
        height: '200px',
      }}
    >
      {/* Outer Circle with Rotation */}
      <Box
        component="img"
        src={outerCircle}
        alt="Outer Circle"
        sx={{
          width: '200px', // Adjust size as needed
          height: '200px',
          position: 'absolute', // Position it on top of inner circle
          animation: `${rotate} 2s linear infinite`, // Rotation animation
          filter: 'invert(39%) sepia(90%) saturate(1556%) hue-rotate(324deg) brightness(101%) contrast(98%)', // Apply color #eb293
        }}
      />

      {/* Inner Circle (Static) */}
      <Box
        component="img"
        src={innerCircle}
        alt="Inner Circle"
        sx={{
          width: '180px', // Slightly smaller to fit within the outer circle
          height: '180px',
          position: 'absolute', // Position it at the center
          top: '10px',
          left: '10px', // Centering by offsetting slightly
          filter: 'invert(14%) sepia(15%) saturate(246%) hue-rotate(144deg) brightness(95%) contrast(90%)', // Apply color #495156
        }}
      />
    </Box>
  );
};

export default Loader;
