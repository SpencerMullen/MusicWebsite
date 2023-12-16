import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import EditEntryDialog from './EditEntry';
import ImageUploadDialog from './UploadImage';
import AddEditReviewDialog from './AddEditReview';
import DeleteEntryDialog from './DeleteEntry';
import DeleteReviewDialog from './DeleteReview';

const EntryButtonsBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#30475e',
    color: '#eeeeee',
    border: 'none',
    borderRadius: 0,
}));

const EntryButtons = ({ entry, reloadEntry }) => {
    // State for opening/closing edit entry dialog
    const [editOpen, setEditOpen] = useState(false);
    const handleEditOpen = () => {
        reloadEntry();
        setEditOpen(true);
    };
    const handleEditClose = () => {
        reloadEntry();
        setEditOpen(false);
    };

    // State for opening/closing image upload dialog
    const [imageOpen, setImageOpen] = useState(false);
    const handleImageOpen = () => {
        reloadEntry();
        setImageOpen(true);
    };
    const handleImageClose = () => {
        reloadEntry();
        setImageOpen(false);
    };

    // State for opening/closing delete dialog
    const [deleteEntryOpen, setDeleteEntryOpen] = useState(false);
    const handleDeleteEntryOpen = () => {
        reloadEntry();
        setDeleteEntryOpen(true);
    };
    const handleDeleteEntryClose = () => {
        reloadEntry();
        setDeleteEntryOpen(false);
    };

    // State for opening/closing add/edit review dialog
    const [reviewOpen, setReviewOpen] = useState(false);
    const handleReviewOpen = () => {
        reloadEntry();
        setReviewOpen(true);
    };
    const handleReviewClose = () => {
        reloadEntry();
        setReviewOpen(false);
    };

    // State for opening/closing delete review dialog
    const [deleteReviewOpen, setDeleteReviewOpen] = useState(false);
    const handleDeleteReviewOpen = () => {
        reloadEntry();
        setDeleteReviewOpen(true);
    };
    const handleDeleteReviewClose = () => {
        reloadEntry();
        setDeleteReviewOpen(false);
    };

    return (
        <>
            <EntryButtonsBox elevation={2}>
                <Button
                    variant="contained"
                    onClick={handleEditOpen}
                    style={{
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        margin: '1rem'
                    }}
                >
                    Edit Entry
                </Button>
                <Button
                    variant="contained"
                    onClick={handleImageOpen}
                    style={{
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        margin: '1rem',
                    }}
                >
                    Upload Image
                </Button>
                <Button
                    variant="contained"
                    onClick={handleDeleteEntryOpen}
                    style={{
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        margin: '1rem',
                    }}
                >
                    Delete Entry
                </Button>
                <Button
                    variant="contained"
                    onClick={handleReviewOpen}
                    style={{
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        margin: '1rem',
                    }}
                >
                    Add/Edit Review
                </Button>
                <Button
                    variant="contained"
                    onClick={handleDeleteReviewOpen}
                    style={{
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        margin: '1rem',
                    }}
                >
                    Delete Review
                </Button>
            </EntryButtonsBox>
            <EditEntryDialog open={editOpen} onClose={handleEditClose} entry={entry} />
            <ImageUploadDialog open={imageOpen} onClose={handleImageClose} entry={entry} />
            <AddEditReviewDialog open={reviewOpen} onClose={handleReviewClose} entry={entry} />
            <DeleteEntryDialog open={deleteEntryOpen} onClose={handleDeleteEntryClose} entry={entry} />
            <DeleteReviewDialog open={deleteReviewOpen} onClose={handleDeleteReviewClose} entry={entry} />
        </>
    );
};

export default EntryButtons;