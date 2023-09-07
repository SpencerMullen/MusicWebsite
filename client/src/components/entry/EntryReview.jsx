import React from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import { formatDate } from '../../utils/formatDate';

const EntryReview = ({ entry }) => {
  return (
    <Grid item xs={12}>
      <Divider sx={{ marginY: '1rem' }} /> {/* Horizontal bar */}
      {entry.reviewed ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                Rating
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '4rem' }}>
                {entry.review.rating}/10
              </Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                Review Date
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '1.2rem' }}>
                {formatDate(entry.review.reviewDate)}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={9}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                Review
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '1.2rem' }}>
                {entry.review.reviewText}
              </Typography>
            </div>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body2" sx={{ fontStyle: 'italic', marginTop: '1rem' }}>
          Not yet reviewed
        </Typography>
      )}
    </Grid>
  );
};

export default EntryReview;