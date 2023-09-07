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
  Slider,
  TextField, // Import TextField component
} from '@mui/material';

const AddEditReviewDialog = ({ open, onClose, entry }) => {
    const [rating, setRating] = useState(entry.review.rating);
    const [reviewDate, setReviewDate] = useState(entry.review.reviewDate);
    const [reviewText, setReviewText] = useState(entry.review.reviewText);

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleReviewDateChange = (event) => {
        setReviewDate(event.target.value);
    };

    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: '720px', maxHeight: '70vh' } }}>
            <DialogTitle>Add/Edit Review</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Rating Slider */}
                    <Grid item xs={12} sx={{marginTop:'1rem'}}>
                        <InputLabel htmlFor="rating">Rating</InputLabel>
                        <Slider
                            value={rating}
                            onChange={handleRatingChange}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={10}
                        />
                    </Grid>

                    {/* Review Date Datepicker */}
                    <Grid item xs={12} sx={{marginBottom:'1rem'}}>
                        <InputLabel htmlFor="reviewDate">Review Date</InputLabel>
                        <Input
                            type="date"
                            id="reviewDate"
                            value={reviewDate}
                            onChange={handleReviewDateChange}
                            fullWidth
                        />
                    </Grid>

                    {/* Review Text TextField */}
                    <Grid item xs={12}>
                        <TextField
                            id="reviewText"
                            label="Review Text"
                            multiline
                            rows={6}
                            fullWidth
                            value={reviewText}
                            onChange={handleReviewTextChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEditReviewDialog;


