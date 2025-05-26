import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRouter = () => {

  const token = localStorage.getItem('token')

  return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRouter