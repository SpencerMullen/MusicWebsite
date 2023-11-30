import React from 'react';
import { Grid, Paper, Box, CardMedia } from '@mui/material';
import defaultImage from '../../assets/default.jpg';

const EntryCover = ({ entry }) => {
  let imageUrl = entry.cover.url || defaultImage;

  // Check if the image URL is a valid URL
  try {
    new URL(imageUrl);
  } catch (error) {
    // If it's not a valid URL, use the default image
    imageUrl = defaultImage;
  }
  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}>
        <Box
          sx={{
            height: 0,
            paddingTop: '100%',
            position: 'relative',
            '& img': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            },
          }}
        >
          <CardMedia
            component="img"
            image={imageUrl}
            alt={entry.title}
          />
        </Box>
      </Paper>
    </Grid>
  );
};

export default EntryCover;