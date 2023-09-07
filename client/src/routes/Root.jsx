import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Grid from '@mui/material/Grid';
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

// Layout for all pages, root handles loading content between header+footer
function RootLayout() {
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
            <Grid container>
              <Grid item xs={12}><Header /></Grid>
              <Grid item xs={12}><main id="main"><Outlet /></main></Grid>
              <Grid item xs={12}><Footer /></Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default RootLayout