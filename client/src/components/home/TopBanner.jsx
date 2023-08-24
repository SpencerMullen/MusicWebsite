import React, { useState } from 'react';
import { Typography, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import CreateEntryDialog from './CreateEntry';

const TopBannerPaper = styled(Paper)(({ theme }) => ({
  height: '15vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#30475e',
  color: '#eeeeee',
}));

const TopBanner = () => {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TopBannerPaper elevation={2}>
        <Typography variant="h5">Welcome to the music review site!</Typography>
        <br />
        <Button
          variant="contained"
          onClick={handleDialogOpen}
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
          }}
        >
          Create New Entry
        </Button>
      </TopBannerPaper>
      <CreateEntryDialog open={open} onClose={handleDialogClose} />
    </div>
  );
};

export default TopBanner;