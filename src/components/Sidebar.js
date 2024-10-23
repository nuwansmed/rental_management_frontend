import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  Build,
  People,
  Assignment,
  ExpandLess,
  ExpandMore,
  ChevronRight,
} from '@mui/icons-material';
import { NavLink, useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';

// Define the width for expanded and collapsed states
const drawerWidth = 260; // Expanded width
const collapsedWidth = 72; // Collapsed width

// Styled Drawer component to handle open and closed states
const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: open ? drawerWidth : collapsedWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    border: 'none', // Remove borders
    borderRadius: open ? '0 20px 20px 0' : '0', // Add curved corners when expanded
    backgroundColor: '#ededed', // Light background color for professionalism
    '& .MuiDrawer-paper': {
      top: '64px', // Adjust to match AppBar height
      width: open ? drawerWidth : collapsedWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: open
          ? theme.transitions.duration.enteringScreen
          : theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      border: 'none', // Remove borders from the drawer paper
      borderRadius: open ? '0 20px 20px 0' : '0', // Add curved corners when expanded
    },
  })
);

// Define the menuItems array
const menuItems = [
  { text: 'Overview', icon: <Dashboard />, path: '/overview' },
  {
    text: 'Inventory',
    icon: <Build />,
    items: [
      { text: 'Inventory', path: '/inventory' },
      
      { text: 'Machines', path: '/inventory/add-machine-type' },
      { text: 'Categories', path: '/inventory/add-category' },
      { text: 'Warehouses', path: '/inventory/add-warehouse' },
    ],
  },
  {
    text: 'Rentals',
    icon: <Assignment />,
    items: [
      { text: 'Rentals', path: '/rentals/new' },
      { text: 'Reservations', path: '/rentals/upcoming' },
      
      { text: 'Overdue Items', path: '/rentals/overdue' },
    ],
  },
  {
    text: 'Customers',
    icon: <People />,
    items: [
      
      { text: 'Customers', path: '/customers' },
      
    ],
  },
];

// Helper function to determine active main menu
const getActiveMenu = (path) => {
  for (let menu of menuItems) {
    if (menu.items) {
      for (let subItem of menu.items) {
        if (path.startsWith(subItem.path)) {
          return menu.text;
        }
      }
    } else {
      if (path === menu.path) {
        return menu.text;
      }
    }
  }
  return '';
};

// Sidebar component
const Sidebar = ({ isOpen, setIsOpen }) => {
  const theme = useTheme();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState(''); // Tracks which menu is open

  // Determine which main menu is active
  const activeMainMenu = getActiveMenu(location.pathname);

  // Handle mouse enter and leave to expand/collapse sidebar
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setOpenMenus(''); // Collapse all menus when sidebar collapses
  };

  const open = isOpen;

  // Increase icon size when sidebar is collapsed
  const getIconStyle = (isCollapsed) => ({
    fontSize: isCollapsed ? '2.2rem' : '1.5rem',
    transition: 'font-size 0.3s ease',
  });

  return (
    <StyledDrawer
      variant="permanent"
      open={open}
      onMouseEnter={handleMouseEnter} // Expand on mouse enter
      onMouseLeave={handleMouseLeave} // Collapse on mouse leave
    >
      <Divider />
      {/* Menu Items */}
      <List>
        {menuItems.map((item) => {
          const isMainActive = activeMainMenu === item.text;

          return (
            <div key={item.text}>
              {/* If the item has sub-items, render a collapsible menu */}
              {item.items ? (
                <>
                  <Tooltip title={!open ? item.text : ''} placement="right">
                    <ListItemButton
                      onClick={() => setOpenMenus(openMenus === item.text ? '' : item.text)}
                      selected={isMainActive}
                      sx={{
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        backgroundColor: isMainActive ? 'rgba(0, 0, 0, 0.08)' : 'inherit',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)', // Subtle hover effect
                        },
                        borderRadius: open ? '4px' : '0', // Add some padding when expanded
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                          color: isMainActive ? '#071A35' : '#EB293A',
                          ...getIconStyle(!open),
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      {open && (
                        <ListItemText
                          primary={item.text}
                          sx={{
                            fontSize: '1rem', // Professional font size
                            fontWeight: isMainActive ? '600' : '400', // Bold for active items
                            textTransform: 'capitalize',
                            color: isMainActive ? '#071A35' : '#495156', // Darker color for active items
                          }}
                        />
                      )}
                      {open && (openMenus === item.text ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                  </Tooltip>
                  <Collapse in={openMenus === item.text} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.items.map((subItem) => (
                        <Tooltip
                          title={!open ? subItem.text : ''}
                          placement="right"
                          key={subItem.text}
                        >
                          <ListItemButton
                            component={NavLink}
                            to={subItem.path}
                            sx={{
                              pl: open ? 4 : 2,
                              justifyContent: open ? 'initial' : 'center',
                              backgroundColor:
                                location.pathname === subItem.path ? 'rgba(0, 0, 0, 0.08)' : 'inherit',
                              '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)', // Subtle hover effect
                              },
                              '&.active': {
                                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                              },
                              borderRadius: open ? '4px' : '0', // Add rounded corners when expanded
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: location.pathname === subItem.path ? '#071A35' : '#071A35',
                                ...getIconStyle(!open),
                              }}
                            >
                              <ChevronRight />
                            </ListItemIcon>
                            {open && (
                              <ListItemText
                                primary={subItem.text}
                                sx={{
                                  fontSize: '0.95rem',
                                  fontWeight: '400',
                                  color: location.pathname === subItem.path ? '#071A35' : '#495156',
                                }}
                              />
                            )}
                          </ListItemButton>
                        </Tooltip>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                // If the item does not have sub-items, render a simple navigation item
                <Tooltip title={!open ? item.text : ''} placement="right">
                  <ListItemButton
                    component={NavLink}
                    to={item.path}
                    selected={location.pathname === item.path}
                    sx={{
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor:
                        location.pathname === item.path ? 'rgba(0, 0, 0, 0.08)' : 'inherit',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)', // Subtle hover effect
                      },
                      borderRadius: open ? '4px' : '0', // Add rounded corners when expanded
                    }}
                    activeClassName="active"
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: location.pathname === item.path ? '#071A35' : '#EB293A',
                        ...getIconStyle(!open),
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {open && (
                      <ListItemText
                        primary={item.text}
                        sx={{
                          fontSize: '1rem',
                          fontWeight: location.pathname === item.path ? '600' : '400',
                          color: location.pathname === item.path ? '#071A35' : '#495156',
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              )}
            </div>
          );
        })}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
