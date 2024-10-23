// src/App.js
import React, { useContext, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { jwtDecode } from 'jwt-decode'; // Corrected the import
import Login from './components/Login';
import Overview from './components/Overview/Overview';
import ViewInventory from './components/Inventory/ViewInventory';
import AddEquipment from './components/Inventory/AddEquipment';
import AddCategory from './components/Inventory/AddCategory';
import AddMachineType from './components/Inventory/AddMachineType';
import AddWarehouse from './components/Inventory/AddWarehouse';
import CreateRental from './components/Rentals/CreateRental';
import UpcomingReservations from './components/Rentals/UpcomingReservations';
import ActiveRentals from './components/Rentals/ActiveRentals';
import OverdueItems from './components/Rentals/OverdueItems';
import Customers from './components/Customers/Customers';
import AddCustomer from './components/Customers/AddCustomer';
import CustomerVerification from './components/Customers/CustomerVerification';
import { UserContext } from './UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import theme from './theme';
import Layout from './components/Layout'; // Import Layout component

function App() {
  const { user, loading, setUser } = useContext(UserContext); // Extract setUser from UserContext
  const navigate = useNavigate(); // Hook for programmatically navigating to routes

  // Function to check if the token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp < currentTime; // Returns true if token is expired
  };

  // Redirect to /login if user is not authenticated and loading is done
  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  React.useEffect(() => {
    const checkTokenExpiration = () => {
      const accessToken = localStorage.getItem('admin_access_token');
      if (accessToken && isTokenExpired(accessToken)) {
        setUser(null);
        localStorage.removeItem('admin_access_token');
        localStorage.removeItem('admin_refresh_token');
        localStorage.removeItem('admin_user');
        navigate('/login');
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000); // Check every 60 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [navigate, setUser]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes with Layout */}
        <Route
          path="/overview"
          element={
            <ProtectedRoute>
              <Layout>
                <Overview />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Layout>
                <ViewInventory />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory/add-equipment"
          element={
            <ProtectedRoute>
              <Layout>
                <AddEquipment />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory/add-category"
          element={
            <ProtectedRoute>
              <Layout>
                <AddCategory />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory/add-machine-type"
          element={
            <ProtectedRoute>
              <Layout>
                <AddMachineType />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory/add-warehouse"
          element={
            <ProtectedRoute>
              <Layout>
                <AddWarehouse />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/rentals/new"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateRental />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/rentals/upcoming"
          element={
            <ProtectedRoute>
              <Layout>
                <UpcomingReservations />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/rentals/active"
          element={
            <ProtectedRoute>
              <Layout>
                <ActiveRentals />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/rentals/overdue"
          element={
            <ProtectedRoute>
              <Layout>
                <OverdueItems />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Layout>
                <Customers />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddCustomer />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/verification"
          element={
            <ProtectedRoute>
              <Layout>
                <CustomerVerification />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
