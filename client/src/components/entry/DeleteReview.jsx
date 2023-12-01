import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import axios from 'axios';

const DeleteReviewDialog = ({ open, onClose, entry }) => {
  const handleDeleteReview = async (e) => {
    e.preventDefault();

    const updatedEntry = {
      ...entry,
      reviewed: false,
    };
    // console.log("Updated entry: ", updatedEntry);
    try {
      const response = await axios.put(`http://localhost:8080/entry/${entry.id}`, { entry: JSON.stringify(updatedEntry) }, {
        headers: {
          'Content-Type': 'application/json'
          // TODO: Add authorization header
        },
      });
      // console.log("Updated entry: ", response.data);
      onClose();
    }
    catch (err) {
      console.log(err);
    }
  }
  
  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Review</DialogTitle>
        <DialogContent>
            <Typography>
                Are you sure you want to hide this review? (This can be undone by editing the review.)
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleDeleteReview} sx={{color: 'red'}}>Delete</Button>
        </DialogActions>
    </Dialog>
  );
};

export default DeleteReviewDialog;