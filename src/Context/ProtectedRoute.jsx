import React from 'react';
import {jwtDecode} from 'jwt-decode';  // Correct import for jwt-decode
import Login from '../Component/Login'; // Your Login component
import { Signup } from '../Component/Signup';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
     
    return <>
    <h1 className='flex justify-center '>You are not admin! :) </h1>
    <Login/>
    </>;
  }

  try {
    const decodedToken = jwtDecode(token);

    // Check if the user has the 'admin' role
    if (decodedToken.role !== 'admin') {
      alert('Access Denied: Admins Only');
      return <Login />; // Redirect to Login if the user is not an admin
    }

    // Render the children if the token is valid and the user is an admin
    return children;

  } catch (err) {
    console.error('Invalid token', err);
    localStorage.removeItem('token');
    return <Login />; // Render Login if the token is invalid
  }
};

export default ProtectedRoute;
