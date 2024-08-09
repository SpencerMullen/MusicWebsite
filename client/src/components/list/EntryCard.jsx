import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/default.jpg'; // Import the default image
import { getFormatDateYear } from '../../utils/formatUtils';

const cardStyles = {
  width: '200px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
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
  fontSize: '0.9rem',
  lineHeight: '1.2rem',
  maxHeight: '2.4rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const subtitleStyles = {
  fontSize: '0.8rem',
  lineHeight: '1.2rem',
  maxHeight: '2.4rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const overlayStyles = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: 'rgba(255, 255, 255, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: '0.8',
  transition: 'opacity 0.3s ease',
};

const EntryCard = ({ entry }) => {
  const [isHovered, setIsHovered] = useState(false);

  let imageUrl = entry.cover.url || defaultImage;

  // Check if the image URL is a valid URL
  try {
    new URL(imageUrl);
  } catch (error) {
    // If it's not a valid URL, use the default image
    imageUrl = defaultImage;
  }

  // If the entry is reviewed, get the rating
  let rating = entry.reviewed ? entry.review.rating : null;

  return (
    <Card
      style={cardStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/entry/${entry.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={imgSectionStyles}>
          <CardMedia
            component="img"
            height="0"
            image={imageUrl}
            alt={entry.title}
            style={imgStyles}
          />
          {isHovered && (
            <div style={overlayStyles}>
              <Typography
                variant="h6"
                color="black"
                sx={{
                  fontWeight: 'bold',
                  fontSize: entry.reviewed ? '2.5rem' : '1.5rem', // Conditionally set font size
                  textAlign: 'center'
                }}
              >
                {/*Rating when hovered*/}
                {entry.reviewed ? `${rating}` : 'Not Reviewed'}
              </Typography>
            </div>
          )}
        </div>
        <CardContent>
          <Typography variant="h6" sx={titleStyles}>
            {entry.title}
          </Typography>
          <Typography variant="subtitle2" sx={subtitleStyles}>
            {getFormatDateYear(entry.releaseDate) + " | " + entry.artist}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default EntryCard;