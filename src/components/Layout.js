// src/components/Layout.js
import React, { useState, useContext } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import AppBar from './AppBar';
import { UserContext } from '../UserContext';

const Layout = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to collapsed

  if (loading || !user) {
    return null; // Or a loading indicator
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#ededed' }}>
      <AppBar isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: '64px', // Adjust for AppBar height
          overflowY: 'auto', // Enable scroll within the main content area
          height: 'calc(100vh - 64px)', // Ensure content fills available space and allows scrolling
          padding: '20px',
          backgroundColor: '#ededed',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
