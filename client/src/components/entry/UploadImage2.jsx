import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
} from '@mui/material';
import { updateEntryImage2 } from '../../utils/requestUtils';
import { useNavigate } from 'react-router-dom';

const ImageUploadDialog2 = ({ open, onClose, entry }) => {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');

    const handleUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleFormSubmit = async () => {
        if (!imageUrl) {
            // Handle case where no URL is entered
            return;
        }

        try {
            const response = await updateEntryImage2(entry.id, imageUrl);
            // Navigate to the entry page
            navigate(`/entry/${response.id}`);

            onClose();
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Enter Image URL</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Image URL Input */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Image URL"
                            variant="outlined"
                            value={imageUrl}
                            onChange={handleUrlChange}
                            sx={{ marginTop: '20px' }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleFormSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageUploadDialog2;
