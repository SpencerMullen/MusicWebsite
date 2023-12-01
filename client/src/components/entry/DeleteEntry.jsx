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
import { useNavigate } from 'react-router-dom';

const DeleteEntryDialog = ({ open, onClose, entry }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/entry/${entry.id}`, {
        headers: {
          'Content-Type': 'application/json'
          // TODO: Add authorization header
        },
      });
      // console.log("Deleted entry: ", response.data);
      navigate('/list');
      onClose();
    }
    catch (err) {
      console.log(err);
    }
  }

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
            <Button onClick={handleDelete} sx={{color: 'red'}}>Delete</Button>
        </DialogActions>
    </Dialog>
  );
};

export default DeleteEntryDialog;