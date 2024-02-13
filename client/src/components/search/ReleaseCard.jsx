import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

const cardStyles = {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
};

const imgSectionStyles = {
    height: '200px',
    width: '100%',
    position: 'relative',
    backgroundColor: '#0000000F',
};

const imgStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
};

const titleStyles = {
    fontSize: '1rem',
    lineHeight: '1.2rem',
    maxHeight: '2.4rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};

const subtitleStyles = {
    fontSize: '0.9rem',
    lineHeight: '1.2rem',
    maxHeight: '2.4rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};

const buttonStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the button
    color: '#000000',
    backgroundColor: '#ffffff',
    border: '2px solid #ffffff',
};

const ReleaseCard = ({ release, open, openDialog, onClose, setEntry }) => {
    const [isHovered, setIsHovered] = useState(false);

    let imageUrl = release.cover.url || defaultImage;

    try {
        new URL(imageUrl);
    } catch (error) {
        imageUrl = defaultImage;
    }

    const truncatedArtist =
        release.artist.length > 18
            ? `${release.artist.slice(0, 14)}...`
            : release.artist;

    const handleAddClick = () => {
        setIsHovered(false);
        setEntry(release);
        openDialog();
    };

    const handleCardClose = () => {
        setIsHovered(false);
        setEntry({});
        onClose();
    }

    return (
        <Card
            style={cardStyles}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={imgSectionStyles}>
                <CardMedia
                    component="img"
                    height="0"
                    image={imageUrl}
                    alt={release.title}
                    style={imgStyles}
                />
                <Button
                    variant="outlined"
                    onClick={handleAddClick}
                    style={{ ...buttonStyles, visibility: isHovered ? 'visible' : 'hidden' }}
                >
                    Add
                </Button>
            </div>
            <CardContent>
                <Typography variant="h6" sx={titleStyles}>
                    {release.title}
                </Typography>
                <Typography variant="subtitle2" sx={subtitleStyles}>
                    {`${truncatedArtist} | ${release.year}`}
                </Typography>
            </CardContent>

            {/* Modal */}
            <Dialog open={open} onClose={handleCardClose}>
                <DialogTitle>Add Release</DialogTitle>
            </Dialog>
        </Card>
    );
};

export default ReleaseCard;
