import React, { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import CreateEntryDialog from './CreateEntry';

const TopBannerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#30475e',
  color: '#eeeeee',
  border: 'none',
  borderRadius: 0,
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
      <TopBannerBox elevation={2}>
        <Typography variant="h5" sx = {{ marginTop: '16px' }}>
          Welcome to my music review site!
        </Typography>

        <Button
          variant="contained"
          onClick={handleDialogOpen}
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            marginTop: '16px',
            marginBottom: '16px',
          }}
        >
          Create New Entry
        </Button>
      </TopBannerBox>
      <CreateEntryDialog open={open} onClose={handleDialogClose} />
    </div>
  );
};

export default TopBanner;