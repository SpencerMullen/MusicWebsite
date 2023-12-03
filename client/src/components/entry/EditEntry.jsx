import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  // IconButton,
  Typography,
} from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { updateEntry } from '../../utils/requestUtils';
const EditEntryDialog = ({ open, onClose, entry }) => {
  const [selectedType, setSelectedType] = useState(entry.type ? entry.type : 'album');
  const [title, setTitle] = useState(entry.title ? entry.title : '');
  const [artist, setArtist] = useState(entry.artist ? entry.artist : '');
  const [releaseDate, setReleaseDate] = useState(entry.releaseDate ? entry.releaseDate : '');
  const [genre, setGenre] = useState(entry.genre ? entry.genre : '');
  // const [file, setFile] = useState(null);

  const handleTypeChange = (event) => {
    setSelectedTy
    pe(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };
  const handleReleaseDateChange = (event) => {
    setReleaseDate(event.target.value);
  };
  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  /* const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }; */

  const handleSave = async (e) => {
    e.preventDefault();

    const updatedEntry = {
      ...entry,
      type: selectedType,
      title: title,
      artist: artist,
      releaseDate: releaseDate,
      genre: genre,
    };
    // console.log('Updated entry: ', updatedEntry);
    try {
      const stringifiedEntry = JSON.stringify(updatedEntry);
      const response = await updateEntry(entry.id, stringifiedEntry);
      // console.log('Updated entry: ', response);
    } catch (err) {
      console.log(err);
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Entry</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Entry Type */}
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ marginTop: '12px' }}>
              <InputLabel htmlFor="entry-type">
                Entry Type
              </InputLabel>
              <Select
                label="Entry Type"
                value={selectedType}
                onChange={handleTypeChange}
                fullWidth
                id="entry-type"
                sx={{ marginTop: '8px' }}
              >
                <MenuItem value="album">Album</MenuItem>
                <MenuItem value="livealbum">Live Album</MenuItem>
                <MenuItem value="ep">EP</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Entry Title */}
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ marginTop: '10px' }}>
              <InputLabel htmlFor="entry-title">
                Title
              </InputLabel>
              <Input
                id="entry-title"
                fullWidth
                defaultValue={title}
                onChange={handleTitleChange}
              />
            </FormControl>
          </Grid>

          {/* Artist */}
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ marginTop: '10px' }}>
              <InputLabel htmlFor="artist">Artist</InputLabel>
              <Input
                id="artist"
                fullWidth
                defaultValue={artist}
                onChange={handleArtistChange}
              />
            </FormControl>
          </Grid>

          {/* Release Date */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ marginBottom: '5px' }}>
              Release Date
            </Typography>
            <FormControl fullWidth>
              <Input
                type="date"
                id="release-date"
                fullWidth
                defaultValue={releaseDate.split('T')[0]}
                onChange={handleReleaseDateChange}
              />
            </FormControl>
          </Grid>

          {/* Genre */}
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ marginTop: '10px' }}>
              <InputLabel htmlFor="genre">Genre</InputLabel>
              <Input
                id="genre"
                fullWidth
                defaultValue={entry.genre}
                onChange={handleGenreChange}
              />
            </FormControl>
          </Grid>

          {/* Image Upload */}
          {/*<Grid item xs={12}>
            <Typography variant="body2" sx={{ marginBottom: '5px' }}>
              Upload New Cover Image
            </Typography>
            <label htmlFor="file-upload">
              <input
                accept="image/*"
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <IconButton
                color="primary"
                component="span"
                sx={{ marginRight: '10px' }}
              >
                <CloudUploadIcon />
              </IconButton>
              {file ? file.name : 'No file selected'}
            </label>
          </Grid>*/}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEntryDialog;