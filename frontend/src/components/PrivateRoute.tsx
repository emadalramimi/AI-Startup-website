import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);

  // Check token validity (you might want to implement a more robust token validation)
  const isTokenValid = () => {
    if (!token) return false;

    try {
      // Basic JWT token validation (decode and check expiration)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const payload = JSON.parse(window.atob(base64));
      
      // Check if token is expired
      return payload.exp * 1000 > Date.now();
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

  // If not authenticated or token is invalid, redirect to login
  if (!isAuthenticated || !isTokenValid()) {
    // Optional: dispatch logout to clear any stale auth state
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render child routes
  return <>{children}</>;
};

export default PrivateRoute;
