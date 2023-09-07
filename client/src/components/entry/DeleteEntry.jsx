import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const DeleteEntryDialog = ({ open, onClose, entry }) => {
  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Entry</DialogTitle>
        <DialogContent>
            <Typography>
                Are you sure you want to delete this entry? This can not be undone.
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} sx={{color: 'red'}}>Delete</Button>
        </DialogActions>
    </Dialog>
  );
};

export default DeleteEntryDialog;