import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { updateEntryImage } from '../../utils/requestUtils'; // Replace with your actual image upload function
import { useNavigate } from 'react-router-dom';

const ImageUploadDialog = ({ open, onClose, entry }) => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleFormSubmit = async () => {
        if (!file) {
            // Handle case where no file is selected
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', file);
            const response = await updateEntryImage(entry.id, formData);
            // Navigate to the entry page
            navigate(`/entry/${response.id}`);

            onClose();
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Upload Cover Image</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Image Upload */}
                    <Grid item xs={12}>
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

export default ImageUploadDialog;
