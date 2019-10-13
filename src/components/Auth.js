import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Auth({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? children : <Redirect to='/' />;
}
