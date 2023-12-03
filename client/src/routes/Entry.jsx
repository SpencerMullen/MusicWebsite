import React, { useState, useEffect } from 'react';
import EntryContent from '../components/entry/EntryContent';
import EntryButtons from '../components/entry/EntryButtons';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getEntry } from '../utils/requestUtils';

const EntryPage = ({ userStatus }) => {
  const { id } = useParams();

  // Fetch entry from server
  const [entry, setEntry] = useState(null);

  const fetchData = async () => {
    const response = await getEntry(id);
    setEntry(response);
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  // Render the entry buttons if the user is an admin
  const renderAuthButtons = () => {
    if (!userStatus.isAuthenticated) return null;
    const isAdmin = userStatus.role === 'admin';
    if (isAdmin) {
      return <EntryButtons entry={entry} reloadEntry={fetchData} />;
    } else {
      return null;
    }
  }

  return (
    <Grid container spacing={2}>
      {entry && (
        <>
          <Grid item xs={12}>
            {renderAuthButtons()}
          </Grid>
          <Grid item xs={12}>
            <EntryContent entry={entry} reloadEntry={fetchData} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default EntryPage;
