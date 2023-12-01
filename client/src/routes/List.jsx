import React from 'react';
import Grid from '@mui/material/Grid';
import TopBanner from '../components/list/TopBanner.jsx';
import EntryList from '../components/list/EntryList.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ListPage() {
  const [entries, setEntries] = useState([]);

  // Fetch entries from server
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/entry');
      setEntries(response.data);
      // console.log('Entries:', response.data);
    } catch (error) {
      console.error('Error getting entries:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        { /* TODO: Render only if admin auth */}
        <TopBanner onCreateEntry={fetchData} />
      </Grid>
      <Grid item xs={12}>
        <EntryList entries={entries}/>
      </Grid>
    </Grid>
  );
}

export default ListPage;