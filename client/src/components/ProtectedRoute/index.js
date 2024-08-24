

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  // Redirect to signup if user is not authenticated
  return user ? children : <Navigate to="/signup" />;
};

export default ProtectedRoute;
