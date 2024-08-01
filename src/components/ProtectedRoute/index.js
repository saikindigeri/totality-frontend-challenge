// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'; // Adjust the path as necessary

const ProtectedRoute = ({ element, ...rest }) => {
 
  const isAuthenticated = localStorage.getItem('token'); // Adjust this logic based on your authentication

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render the protected element if authenticated
  return element;
};

export default ProtectedRoute;
