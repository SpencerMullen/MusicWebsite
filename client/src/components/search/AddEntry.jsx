import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    FormControl,
    Input,
    Checkbox,
    FormControlLabel,
    Typography,
} from '@mui/material';
import { postDiscogsEntry } from '../../utils/requestUtils';
import { useNavigate } from 'react-router-dom';

const AddDialog = ({ open, onClose, entry }) => {
    const navigate = useNavigate();
    const [isLiveAlbum, setIsLiveAlbum] = useState(false);
    const [releaseDate, setReleaseDate] = useState('');

    const handleCheckboxChange = () => {
        setIsLiveAlbum(!isLiveAlbum);
    };

    const handleDateChange = (event) => {
        setReleaseDate(event.target.value);
    };

    const handleCancel = () => {
        onClose();
    };

    const handleSubmit = async () => {
        const newEntry = {
            ...entry,
            type: isLiveAlbum ? 'livealbum' : entry.type,
            releaseDate: releaseDate,
        };
        console.log(newEntry);
        const response = await postDiscogsEntry(newEntry);
        onClose();
        navigate(`/entry/${response.id}`);
    };

    useEffect(() => {
        if (entry.year) {
            setReleaseDate(`${entry.year}-01-01`);
        }
    }, [entry]);

    // Render the live album checkbox if the release is an album
    const renderCheckbox = () => {
        if (entry.type === 'album') {
            return (
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isLiveAlbum}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="Live Album?"
                    />
                </Grid>
            );
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{`Do you want to add '${entry.title}' by ${entry.artist}?`}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
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
                                value={releaseDate}
                                onChange={handleDateChange}
                            />
                        </FormControl>
                        <Typography variant="caption" color="textSecondary" sx={{ marginTop: '5px' }}>
                            Specify release date (use the 1st for unknown days and Jan for unknown months)
                        </Typography>
                    </Grid>

                    {/* Checkbox */}
                    {renderCheckbox()}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddDialog;