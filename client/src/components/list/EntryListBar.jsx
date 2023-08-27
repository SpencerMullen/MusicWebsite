import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, TextField, Box } from '@mui/material';

const EntryListBar = () => {
  const [selectedSort, setSelectedSort] = useState('artist');
  const [searchQuery, setSearchQuery] = useState('');
  const [liveChecked, setLiveChecked] = useState(true);
  const [epChecked, setEpChecked] = useState(true);
  const [onlyChecked, setOnlyChecked] = useState(false);

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLiveCheckboxChange = (event) => {
    setLiveChecked(event.target.checked);
  };

  const handleEpCheckboxChange = (event) => {
    setEpChecked(event.target.checked);
  };

  const handleOnlyCheckboxChange = (event) => {
    setOnlyChecked(event.target.checked);
  };

  return (
    <Box
      sx={{
        padding: '1rem',
        backgroundColor: '#EFEFEF',
        borderBottom: '1px solid #DDD',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <TextField
        id="search"
        label="Search"
        variant="outlined"
        size="small"
        sx={{ width: '50%' }}
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <FormControl sx={{ width: '20%', marginLeft: '1rem' }}>
        <InputLabel>Sort by</InputLabel>
        <Select label="Sort by" value={selectedSort} onChange={handleSortChange}>
          <MenuItem value="artist">Artist</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="date">Review Date</MenuItem>
        </Select>
      </FormControl>

      <Checkbox
        checked={liveChecked}
        onChange={handleLiveCheckboxChange}
        sx={{ marginLeft: '1rem' }}
      />
      <ListItemText primary="Live" sx={{ marginLeft: '0.2rem' }} />

      <Checkbox
        checked={epChecked}
        onChange={handleEpCheckboxChange}
        sx={{ marginLeft: '1rem' }}
      />
      <ListItemText primary="EP" sx={{ marginLeft: '0.2rem' }} />

      <Checkbox
        checked={onlyChecked}
        onChange={handleOnlyCheckboxChange}
        sx={{ marginLeft: '1rem' }}
      />
      <ListItemText primary="Only?" sx={{ marginLeft: '0.2rem' }} />
    </Box>
  );
};

export default EntryListBar;