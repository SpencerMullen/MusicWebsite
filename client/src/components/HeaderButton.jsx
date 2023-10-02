import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function HeaderButton( {text, link} ) {
    return (<Button color="inherit"
              component={Link}
              to={link}
              sx={{
                marginLeft: '10px',
                '&:hover': {
                  backgroundColor: '#333', // Darker background color on hover
                  color: 'white', // Text color on hover
                  transition: 'background-color 0.3s ease, color 0.3s ease', // Transition effect
                },
              }}>{text}</Button>
    );
}