import React from 'react';
import Grid from '@mui/material/Grid';
import TopBanner from '../components/list/TopBanner.jsx';
import EntryList from '../components/list/EntryList.jsx';
import { useState, useEffect } from 'react';
import { getEntries } from '../utils/requestUtils';

function ListPage({ userStatus }) {
  const [entries, setEntries] = useState([]);

  const [query, setQuery] = useState(
    {

    }
  );
  // Fetch entries from server
  const fetchData = async () => {
    const fetchedEntries = await getEntries();
    setEntries(fetchedEntries);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Render the top banner for creating new entries if the user is an admin
  const topBannerRender = () => {
    if (!userStatus.isAuthenticated) return null;
    const isAdmin = userStatus.role === 'admin';
    if (isAdmin) {
      return <TopBanner onCreateEntry={fetchData} />
    } else {
      return null;
    }
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        {topBannerRender()}
      </Grid>
      <Grid item xs={12}>
        <EntryList entries={entries} />
      </Grid>
    </Grid>
  );
}

export default ListPage;