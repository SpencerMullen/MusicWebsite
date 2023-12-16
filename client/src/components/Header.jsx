import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HeaderButton from './HeaderButton';
import { logout } from '../utils/requestUtils';
export default function ButtonAppBar({ userStatus, handleUserStatus }) {
  const navigate = useNavigate();
  // Logout
  const handleLogout = async () => {
    try {
      const response = await logout();
      // console.log('Logout response:', response);
      handleUserStatus({ isAuthenticated: false });
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err.message);
    }
  };    

  const renderAuthButton = () => {
    if (userStatus && userStatus.isAuthenticated) {
      // User is authenticated, render Logout button
      return <HeaderButton text="Logout" link="/" logout={true} clicked={handleLogout} />;
    } else {
      // User is not authenticated, render Login button
      return <HeaderButton text="Login" link="/login" />;
    }
  };

  const renderSearchButton = () => {
    if (userStatus && userStatus.isAuthenticated) {
      // User is authenticated, render Search button
      return <HeaderButton text="Search" link="/search" />;
    }
  };

  return (
    <Box
      id="header"
      sx={{
        flexGrow: 1,
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
              Music List
            </Link>
          </Typography>
          {/* Home, List, and About buttons */}
          <HeaderButton text="Home" link="/" />
          <HeaderButton text="List" link="/list" />
          {/* <HeaderButton text="About" link="/about" /> */}
          {/* Search button */}
          {renderSearchButton()}
          {/* Login and Logout buttons */}
          {renderAuthButton()}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
