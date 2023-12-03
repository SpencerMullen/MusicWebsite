import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
// Change theme here
import { gray_dark_blue as colors } from '../colors';
import homeBg from '../assets/homebg.jpg';

// Color theme
const { primary, dark, light, contrastText } = colors;
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

// Layout for all pages, root handles loading content between header+footer
function RootLayout({ userStatus, handleUserStatus }) {
  // Find the location and render the background if it's the home page
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const homeBackground = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundImage: `url(${homeBg})`,
    backgroundSize: 'cover',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    margin: 0, // Add this line to set margin to 0
    padding: 0, // Add this line to set padding to 0
  };

  // Set header and footer height
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector('#header');
    const footer = document.querySelector('#footer');
    const main = document.querySelector('#main');

    if (header && footer && main) {
      setHeaderHeight(header.offsetHeight);
      setFooterHeight(footer.offsetHeight);
    }

    // Handle window resize
    const handleResize = () => {
      if (header && footer && main) {
        setHeaderHeight(header.offsetHeight);
        setFooterHeight(footer.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const main = document.querySelector('#main');

    if (main) {
      main.style.paddingTop = `${headerHeight}px`;
      main.style.paddingBottom = `${footerHeight}px`;
    }
  }, [headerHeight, footerHeight]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Render the background if it's the home page */}
      <Grid container style={isHomePage ? homeBackground : {}}>
        <Grid item xs={12}><Header userStatus={userStatus} handleUserStatus={handleUserStatus} /></Grid>
        <Grid item xs={12}><main id="main"><Outlet /></main></Grid>
        <Grid item xs={12}><Footer /></Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default RootLayout