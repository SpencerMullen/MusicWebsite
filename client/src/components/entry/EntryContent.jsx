import React from 'react';
import { Container, Grid } from '@mui/material';
import exCover from '../../assets/vbird.jpg'; // Import the default image
import EntryCover from './EntryCover';
import EntryDetails from './EntryDetails';
import EntryReview from './EntryReview';

const EntryContent = ({ entry }) => {
  return (
  <Container maxWidth="lg" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
    <Grid container spacing={2}>
      <EntryCover entry={entry} exCover={exCover} />
      <EntryDetails entry={entry} />
      <EntryReview entry={entry} />
    </Grid>
  </Container>
  );
};

export default EntryContent;