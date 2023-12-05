import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/default.jpg'; // Import the default image
import { getFormatDateYear } from '../../utils/formatUtils';

const cardStyles = {
  width: '200px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const imgSectionStyles = {
  height: '200px', // Set a fixed height for the image section (making it a square)
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
  const truncatedArtist = entry.artist.length > 30 ? `${entry.artist.slice(0, 16)}...` : entry.artist;

  return (
    <Card style={cardStyles}>
      <Link to={`/entry/${entry.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={imgSectionStyles}>
          <CardMedia
            component="img"
            height="0"
            image={imageUrl}
            alt={entry.title}
            style={imgStyles}
          />
        </div>
        <CardContent>
          <Typography variant="h6" sx={titleStyles}>
            {entry.title}
          </Typography>
          <Typography variant="subtitle2" sx={subtitleStyles}>
            {`${truncatedArtist} | ${getFormatDateYear(entry.releaseDate)}`}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default EntryCard;