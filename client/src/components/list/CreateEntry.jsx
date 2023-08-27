import React, { useState } from 'react';
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
  IconButton,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CreateEntryDialog = ({ open, onClose }) => {
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [selectedType, setSelectedType] = useState('album');
  const [file, setFile] = useState(null);

  const handleTitleFocus = () => {
    setIsTitleFocused(true);
  };

  const handleTitleBlur = () => {
    setIsTitleFocused(false);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Entry</DialogTitle>
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
                <MenuItem value="liveAlbum">Live Album</MenuItem>
                <MenuItem value="ep">EP</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Entry Title */}
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ marginTop: '10px' }}>
              <InputLabel
                focused={isTitleFocused}
                htmlFor="entry-title"
              >
                Title
              </InputLabel>
              <Input
                id="entry-title"
                onFocus={handleTitleFocus}
                onBlur={handleTitleBlur}
                fullWidth
              />
            </FormControl>
          </Grid>

          {/* Artist */}
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ marginTop: '10px' }}>
              <InputLabel htmlFor="artist">Artist</InputLabel>
              <Input id="artist" fullWidth />
            </FormControl>
          </Grid>

          {/* Review Date */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ marginBottom: '5px' }}>
              Review Date
            </Typography>
            <FormControl fullWidth>
              <Input type="date" id="review-date" fullWidth />
            </FormControl>
          </Grid>

          {/* Genre */}
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ marginTop: '10px' }}>
              <InputLabel htmlFor="genre">Genre</InputLabel>
              <Input id="genre" fullWidth />
            </FormControl>
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ marginBottom: '5px' }}>
              Upload Cover Image
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
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEntryDialog;