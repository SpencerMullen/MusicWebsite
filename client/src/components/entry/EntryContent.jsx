import React from 'react';
import { Container, Grid } from '@mui/material';
import exCover from '../../assets/vbird.jpg'; // Import the default image
import EntryCover from './EntryCover';
import EntryDetails from './EntryDetails';
import EntryReview from './EntryReview';

const EntryContent = () => {
// Replace this with actual entry data
  const entry = {
    id: '1',
    /*addedBy: {
      userId: '1',
      username: 'sampleUser',
    },*/
    reviewed: true,
    type: 'Album',
    title: 'Volcanic Bird Enemy and the Voiced Concern',
    artist: 'Lil Ugly Mane',
    releaseDate: '2010-05-15',
    genre: 'Folk',
    cover: {
      url: 'google.com',
      fileName: 'sample-image.jpg',
    },
    review: {
      rating: 8,
      reviewText: "Fiona Apple is a big fan of incredibly long album titles, even holding the world record with When the Pawn… for some time. Fiona Apple is a big fan of incredibly long album titles, even holding the world record with When the Pawn… for some time. Fiona Apple is a big fan of incredibly long album titles, even holding the world record with When the Pawn… for some time. Fiona Apple is a big fan of incredibly long album titles, even holding the world record with When the Pawn… for some time. Fiona Apple is a big fan of incredibly long album titles, even holding the world record with When the Pawn… for some time. Fiona Apple is a big fan of incredibly long album titles, even holding the world record with When the Pawn… for some time. Fiona Apple is a big fan of incredibly long album titles, even holding the world record with When the Pawn… for some time. This is a sample review. It's not a real review, but it's a review nonetheless. Fiona Apple is a big fan of incredibly long album titles, even holding the world record with When the Pawn… for some time.  Fiona Apple is a big fan of incredibly long album titles, even holding the world record with When the Pawn… for some time. ",
      reviewDate: '2023-08-14',
    }
  };

  return (
  <Container maxWidth="lg" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
    <Grid container spacing={2}>
      <EntryCover exCover={exCover} />
      <EntryDetails entry={entry} />
      <EntryReview entry={entry} />
    </Grid>
  </Container>
  );
};

export default EntryContent;