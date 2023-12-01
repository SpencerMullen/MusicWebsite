import React from 'react';
// import FeaturedAlbum from '../components/home/FeaturedAlbum';
import FullListLink from '../components/home/FullListLink';
// import RandomAlbum from '../components/home/RandomAlbum';
import Grid from '@mui/material/Grid';

function HomePage() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', background: 'linear-gradient(to bottom, #222, #000)' }}>
      <Grid container spacing={2} justifyContent="center" style={{ flex: '1', width: '100%' }} flexDirection="column" alignItems="center">
        {/*<Grid item xs={12} sm={4} style={{ border: '1px solid black' }} width='100%'>
          <FeaturedAlbum />
        </Grid>*/}
        <Grid item xs={12} sm={4} style={{ border: '1px solid black', padding: '10px' }}>
          <FullListLink />
        </Grid>
        {/*<Grid item xs={12} sm={4} style={{ border: '1px solid black', padding: '10px' }}>
          <RandomAlbum />
        </Grid>*/}
      </Grid>
    </div>
  );
}

export default HomePage;
