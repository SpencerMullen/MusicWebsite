import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
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

const TopBanner = (props) => {
  const { onCreateEntry } = props;

  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    onCreateEntry();
  };

  return (
    <>
      <TopBannerBox elevation={2}>
        <Button
          variant="contained"
          onClick={handleDialogOpen}
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            margin: '1rem',
          }}
        >
          Create New Entry
        </Button>
      </TopBannerBox>
      <CreateEntryDialog open={open} onClose={handleDialogClose} />
    </>
  );
};

export default TopBanner;