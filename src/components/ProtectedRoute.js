// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const { user, loading, setUser } = useContext(UserContext);

  // Function to check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp < currentTime;
  };

  // Check for token expiration and user authentication
  const accessToken = localStorage.getItem('admin_access_token');
  if (!loading && (!user || isTokenExpired(accessToken))) {
    // Clear user context and localStorage if token is expired
    setUser(null);
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
    localStorage.removeItem('admin_user');

    return <Navigate to="/login" />; // Redirect to login if not authenticated or token expired
  }

  return children; // Render the protected content if authenticated
};

export default ProtectedRoute;
