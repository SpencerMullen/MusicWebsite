import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

// Use the dark theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Color theme
const primary = '#393E46';
const dark = '#222831';
const light = '#bec8d2';
const contrastText = '#EEEEEE';
const theme = createTheme({
    palette: {
      primary: {
        main: primary,
        light: light,
        dark: dark,
        contrastText: contrastText
      },
      background: {
        default: light,
      }
    },
});

// Layout for all pages
function RootLayout() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <main><Outlet /></main>
            <Footer />
        </ThemeProvider>
    )}

export default RootLayout