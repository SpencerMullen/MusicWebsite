import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { updateEntry } from '../../utils/requestUtils';
const DeleteReviewDialog = ({ open, onClose, entry }) => {
  const handleDeleteReview = async (e) => {
    e.preventDefault();

    const updatedEntry = {
      ...entry,
      reviewed: false,
    };
    // console.log("Updated entry: ", updatedEntry);
    try {
      const stringifiedEntry = JSON.stringify(updatedEntry);
      const response = await updateEntry(entry.id, stringifiedEntry);
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