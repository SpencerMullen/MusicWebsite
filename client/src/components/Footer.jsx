import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// Footer component
export default function Footer() {
    return (
            <Box id="footer"
                sx={{ flexGrow: 1,
                width: '100%',
                position: 'fixed',
                bottom: 0,
                left: 0,
                zIndex: 1
                }}>
                <AppBar position="static" sx = {{ padding: '0.7rem' }}>
                    <Typography component="footer" 
                        sx={{ flexGrow: 1 }}>
                    Made by Spencer Mullen
                    </Typography>
                </AppBar>
            </Box>
    )
}