import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Tabs, Tab, Paper } from '@mui/material';

const RibbonTemplate = ({ title, buttonLabel, onButtonClick, tabValue, onTabChange, tabs }) => {
  const [elevated, setElevated] = useState(false);

  // Add a scroll event listener to elevate the ribbon when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setElevated(true);
      } else {
        setElevated(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ width: '100%', position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* Ribbon Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f8f9fa', // Light gray background for a cleaner look
          padding: '16px 32px',
          boxShadow: elevated ? '0px 4px 12px rgba(0, 0, 0, 0.08)' : 'none', // Subtle shadow on scroll
          borderBottom: elevated ? 'none' : '1px solid #e0e0e0', // Border only when not scrolled
          transition: 'box-shadow 0.3s ease, border-bottom 0.3s ease',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: '600', color: '#343a40' }}>
          {title}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onButtonClick}
          sx={{
            textTransform: 'none', // Remove uppercase transformation for a modern feel
            padding: '8px 24px',
            fontSize: '0.875rem', // Slightly smaller font size for a clean look
            borderRadius: '8px', // Softer button corners
            backgroundColor: '#1976d2', // Primary color
            '&:hover': {
              backgroundColor: '#1565c0', // Darker shade on hover
            },
          }}
        >
          {buttonLabel}
        </Button>
      </Box>

      {/* Tabs Section */}
      <Paper
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: '#ffffff', // White background for tab section
          padding: '8px 32px',
          boxShadow: 'none', // No shadow for the tabs section
        }}
      >
        <Tabs
          value={tabValue}
          onChange={onTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            '& .MuiTab-root': {
              fontSize: '1rem',
              fontWeight: 500,
              padding: '10px 20px', // Adjust tab padding for a tighter layout
              textTransform: 'none', // Keep the tab text non-uppercase for a modern look
              minWidth: 'auto', // Remove minWidth for tabs to adjust better to content
              '&:hover': { color: '#1565c0' }, // Add hover effect
            },
            '& .MuiTabs-indicator': {
              height: '3px', // Thicker indicator for modern look
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Paper>
    </Box>
  );
};

export default RibbonTemplate;
