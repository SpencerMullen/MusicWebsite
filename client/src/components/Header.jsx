import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ButtonAppBar() {
    return (
      <Box sx={{ flexGrow: 1,
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0}}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="header" sx={{ flexGrow: 1}}>
              Music List
            </Typography>
            <Button color="inherit" component={Link} to = "/">Home</Button>
            <Button color="inherit" component={Link} to = "/About">About</Button>
            <Button color="inherit" component={Link} to = "/Login">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }