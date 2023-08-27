import React from 'react';
import { Container, Grid, Typography, Paper, Box } from '@mui/material';

const EntryContent = () => {
// Replace this with actual entry data
  const entry = {
    title: 'The Idler Wheel Is Wiser Than the Driver of the Screw and Whipping Cords Will Serve You More Than Ropes Will Ever Do',
    artist: 'Sample Artist',
    releaseDate: '2023-08-14',
    cover: {
      url: 'sample-image.jpg',
    },
    rating: 4.5,
    review:
      'This is a sample review for the album. It can be quite long and contain detailed information about the album.',
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ backgroundColor: '#f0f0f0', padding: '1rem' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', width: '100%' }}>
          {entry.title}
        </Typography>
      </Box>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper>
              {/* Album Image */}
              <img src={entry.cover.url} alt={entry.title} style={{ width: '100%', height: 'auto' }} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper>
              {/* Album Information */}
              <Typography variant="h6">Artist: {entry.artist}</Typography>
              <Typography variant="subtitle1">
                Release Date: {new Date(entry.releaseDate).toLocaleDateString()}
              </Typography>
              {/* You can add more album details here */}
            </Paper>
          </Grid>
        </Grid>
        <Paper style={{ marginTop: '16px', padding: '16px' }}>
          {/* Album Review */}
          <Typography variant="h5" gutterBottom>
            Album Review
          </Typography>
          <Typography variant="body1">{entry.review}</Typography>
          <Typography variant="h6" style={{ marginTop: '16px' }}>
            Rating: {entry.rating}
          </Typography>
        </Paper>
      </Container>
    </Container>
  );
};

export default EntryContent;