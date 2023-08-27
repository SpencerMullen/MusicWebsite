import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import defaultImage from '../../assets/default.jpg'; // Import the default image

const cardStyles = {
  width: '360px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const imgSectionStyles = {
  height: '360px', // Set a fixed height for the image section (making it a square)
  width: '100%', // Make the image section cover the entire card width
  position: 'relative', // Add relative positioning
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

const EntryCard = ({ entry }) => {
  let imageUrl = entry.cover.url || defaultImage;

  // Check if the image URL is a valid URL
  try {
    new URL(imageUrl);
  } catch (error) {
    // If it's not a valid URL, use the default image
    imageUrl = defaultImage;
  }

  // Truncate the artist name if it's too long
  const truncatedArtist = entry.artist.length > 30 ? `${entry.artist.slice(0, 30)}...` : entry.artist;

  return (
    <Card style={cardStyles}>
      <div style={imgSectionStyles}>
        <CardMedia
          component="img"
          height="0"
          image={imageUrl}
          alt={entry.title} // Use the title if available, or a default alt text
          style={imgStyles}
        />
      </div>
      <CardContent>
        <Typography variant="h6" sx={titleStyles}>
          {entry.title}
        </Typography>
        <Typography variant="subtitle2" sx={subtitleStyles}>
          {`${truncatedArtist} | ${new Date(entry.releaseDate).getFullYear()}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EntryCard;