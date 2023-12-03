import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function HeaderButton( {text, link, logout, clicked} ) {
    return (<Button color="inherit"
              component={Link}
              to={link}
              onClick={clicked}
              sx={{
                marginLeft: '10px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  color: 'white',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                },
                border: logout ? '1px solid white' : 'none',
              }}>{text}</Button>
    );
}