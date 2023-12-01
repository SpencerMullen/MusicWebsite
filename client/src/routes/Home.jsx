import React from 'react';
// import FeaturedAlbum from '../components/home/FeaturedAlbum';
import FullListLink from '../components/home/FullListLink';
// import RandomAlbum from '../components/home/RandomAlbum';
import Grid from '@mui/material/Grid';

function HomePage() {
  return (
    <div> {/*style={backgroundStyle}>*/}
      <Grid container spacing={2} justifyContent="center">
        {/*<Grid item xs={12} sm={4}>
          <FeaturedAlbum />
        </Grid>*/}
        <Grid item xs={12} sm={4}>
          <FullListLink />
        </Grid>
        {/*<Grid item xs={12} sm={4}>
          <RandomAlbum />
      </Grid>*/}
      </Grid>
    </div>
  );
}

export default HomePage;
