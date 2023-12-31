import React from 'react';
import { Grid, Typography, Divider, Button } from '@mui/material';
import { formatDate, formatType, getFormatDateYear } from '../../utils/formatUtils';

const EntryDetails = ({ entry }) => {
  return (
    <Grid item xs={12} md={8}>
      <Grid container spacing={2}>
        {/* Entry Title */}
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {entry.title}
          </Typography>
          {/* Horizontal bar */}
          <Divider sx={{ marginY: '1rem' }} />
        </Grid>
        {/* Artist */}
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            Artist
          </Typography>
          <Typography variant="body2" sx={{fontSize: '1.2rem'}}>
            {entry.artist}
          </Typography>
        </Grid>
        {/* Entry Type */}
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              Type
          </Typography>
          <Typography variant="body2" sx={{fontSize: '1.2rem'}}>
            {formatType(entry.type)}
          </Typography>
        </Grid>
        {/* Release Date */}
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            Release Year
            {/*Release Date*/}
          </Typography>
          <Typography variant="body2" sx={{fontSize: '1.2rem'}}>
            {getFormatDateYear(entry.releaseDate)}
            {/*formatDate(entry.releaseDate)*/}
          </Typography>
        </Grid>
        {/* Genre */}
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            Genre
          </Typography>
          <Typography variant="body2" sx={{fontSize: '1.2rem'}}>
            {entry.genre}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EntryDetails;