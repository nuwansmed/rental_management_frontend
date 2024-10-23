// src/components/AppBar.js
import React, { useState, useContext } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box as MuiBox,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import logoWheel from '../assets/logo_wheel.png';

const AppBar = ({ isSidebarOpen }) => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
    localStorage.removeItem('admin_user');
    navigate('/login');
  };

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Add drop shadow for raised look
        zIndex: (theme) => theme.zIndex.drawer + 1,  // Ensure AppBar is above the Sidebar
      }}
    >
      <Toolbar>
        {/* Logo */}
        <MuiBox sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <img
            src={isSidebarOpen ? logo : logoWheel}
            alt="Logo"
            style={{ height: '40px', marginRight: '16px' }}
          />
          {/* You can include your title here if needed */}
        </MuiBox>
        {/* Right-side Icons */}
        <MuiBox sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="primary"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ backgroundColor: '#ffffff', borderRadius: '50%', padding: '8px' }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>Account Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </MuiBox>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
