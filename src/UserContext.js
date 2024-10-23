// src/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Define a provider component for the UserContext
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // State to hold the authenticated user
  const [loading, setLoading] = useState(true);  // State to handle loading status for auth check

  useEffect(() => {
    const token = localStorage.getItem('admin_access_token');
    const userData = localStorage.getItem('admin_user');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    
    // Set loading to false after auth check
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
