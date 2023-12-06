import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, TextField, Box } from '@mui/material';

const EntryListBar = (props) => {
  const {
    selectedSort,
    searchQuery,
    liveChecked,
    epChecked,
    onlyChecked,
    handleSortChange,
    handleSearchChange,
    handleLiveCheckboxChange,
    handleEpCheckboxChange,
    handleOnlyCheckboxChange,
  } = props;

  /*useEffect(() => {
    // Set a timer to trigger the search after 500 milliseconds
    const timer = setTimeout(() => {
      handleSearchChange(searchQuery);
    }, 500);

    // Clear the timer if the search query changes
    return () => clearTimeout(timer);
  }, [searchQuery, handleSearchChange]);*/

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
        <InputLabel id="sort-label" sx={{ zIndex: 0 }}>Sort by</InputLabel>
        <Select label="Sort by" value={selectedSort} onChange={handleSortChange}>
          <MenuItem value="artist_asc">Artist (A-Z)</MenuItem>
          <MenuItem value="artist_dsc">Artist (Z-A)</MenuItem>
          <MenuItem value="title_asc">Title (A-Z)</MenuItem>
          <MenuItem value="title_dsc">Title (Z-A)</MenuItem>
          <MenuItem value="releaseDate_dsc">Release Date (New-Old)</MenuItem>
          <MenuItem value="releaseDate_asc">Release Date (Old-New)</MenuItem>
          <MenuItem value="rating_asc">Rating (Low-High)</MenuItem>
          <MenuItem value="rating_dsc">Rating (High-Low)</MenuItem>
          <MenuItem value="reviewDate_dsc">Review Date (New-Old)</MenuItem>
          <MenuItem value="reviewDate_asc">Review Date (Old-New)</MenuItem>
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