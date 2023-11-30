import React, { useState, useEffect } from 'react';
import EntryContent from '../components/entry/EntryContent';
import EntryButtons from '../components/entry/EntryButtons';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EntryPage = () => {
  const { id } = useParams();

  // Fetch entry from server
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/entry/${id}`);
        setEntry(response.data);
        console.log('Entry:', response.data);
      } catch (error) {
        console.error('Error getting entry:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Grid container spacing={2}>
      {entry && (
        <>
          <Grid item xs={12}>
            {/* TODO: Render only if admin auth */}
            <EntryButtons entry={entry} />
          </Grid>
          <Grid item xs={12}>
            <EntryContent entry={entry} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default EntryPage;
