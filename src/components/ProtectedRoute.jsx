import React from 'react';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  // implementasi auth nanti
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
