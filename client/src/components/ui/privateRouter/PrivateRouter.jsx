import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/authorization/login" replace />;
};

export default PrivateRouter