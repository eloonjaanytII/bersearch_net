import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {

  const token = localStorage.getItem('token')
  return token ? <Outlet /> : <Navigate to="/authorization/register" replace />;
};

export default PrivateRouter