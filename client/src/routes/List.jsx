import React from 'react';
import Grid from '@mui/material/Grid';
import TopBanner from '../components/list/TopBanner.jsx';
import EntryList from '../components/list/EntryList.jsx';

function ListPage() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <TopBanner />
      </Grid>
      <Grid item xs={12}>
        <EntryList />
      </Grid>
    </Grid>
  );
}

export default ListPage;