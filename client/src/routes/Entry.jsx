import React from 'react';
import EntryContent from '../components/entry/EntryContent';
import EntryButtons from '../components/entry/EntryButtons';
import { Grid } from '@mui/material';

const EntryPage = () => {
  // Replace this with actual entry data
  const entry = {
    id: '1',
    /*addedBy: {
      userId: '1',
      username: 'sampleUser',
    },*/
    reviewed: true,
    type: 'livealbum',
    title: 'Volcanic Bird Enemy and the Voiced Concern',
    artist: 'Lil Ugly Mane',
    releaseDate: '2010-05-15',
    genre: 'Harisnt',
    cover: {
      url: 'google.com',
      fileName: 'sample-image.jpg',
    },
    review: {
      rating: 8,
      reviewText: "Volcanic Bird Enemy and the Voiced Concern is outstanding. It's a masterpiece (the cover).",
      reviewDate: '2023-08-14',
    }
  };

    return (    
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* TODO: Render only if admin auth, also send props into entrybuttons and entry content */}
          <EntryButtons entry = {entry} />
        </Grid>
        <Grid item xs={12}>
          <EntryContent entry = {entry} />
        </Grid>
      </Grid>
  );
};

export default EntryPage;