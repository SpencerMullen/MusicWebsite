import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HeaderButton from './HeaderButton';

export default function ButtonAppBar() {
    return (
      <Box id="header"
        sx={{ flexGrow: 1,
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1
        }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit", fontWeight: 'bold' }}>
                Music List
              </Link>
            </Typography>
            {/* Home, List, and About buttons */}
            <HeaderButton text="Home" link="/" />
            <HeaderButton text="List" link="/list" />
            <HeaderButton text="About" link="/about" />
            {/* Login and Logout buttons */}
            {/*TODO: conditionally render correct button */}
            <HeaderButton text="Login" link="/login" />
            {/*<Button color="inherit"
            component={Link}
            to="/"
            sx={{
              backgroundColor: '#3f51b5',
              color: 'white',
              borderRadius: '20px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease, color 0.3s ease',
              marginLeft: '10px',
              '&:hover': {
                backgroundColor: '#304ffe',
              },
            }}>Logout</Button>*/}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }