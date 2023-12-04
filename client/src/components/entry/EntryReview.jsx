import React from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import { formatDate } from '../../utils/formatUtils';

const EntryReview = ({ entry }) => {
  const processMarkdown = (text) => {
    // Replace bold syntax (*text*) with <strong>text</strong>
    const textWithBold = text.replace(/\*(.*?)\*/g, (_, match) => `<strong>${match}</strong>`);
  
    // Replace italic syntax (_text_) with <em>text</em>
    const textWithItalic = textWithBold.replace(/_(.*?)_/g, (_, match) => `<em>${match}</em>`);
  
    return textWithItalic;
  };
  const processedReviewText = processMarkdown(entry.review.reviewText);

  return (
    <Grid item xs={12}>
      <Divider sx={{ marginY: '1rem' }} />
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
                {processedReviewText}
              </Typography>
            </div>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ fontStyle: 'italic', marginTop: '1rem' }}>
            Not yet reviewed
          </Typography>
        </Grid>
      )}
      <Divider sx={{ marginY: '1rem' }} />
    </Grid>
  );
};

export default EntryReview;