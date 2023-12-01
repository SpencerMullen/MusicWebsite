import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function FullListLink() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '5rem',
  };

  const welcomeTextStyle = {
    fontSize: '4em',
  };

  const visitButtonStyle = {
    marginTop: '30px',
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    fontSize: '2em',
    padding: '15px 30px',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.5s ease-out', // Add transition for background-color
  };

  const hoverStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the alpha value for the hover color
  };

  return (
    <div style={containerStyle}>
      <div style={welcomeTextStyle}>Welcome</div>
      <Link to="/list" style={{ textDecoration: 'none' }}>
        <Button
          style={visitButtonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = hoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = visitButtonStyle.backgroundColor}
        >
          Visit the Full List
        </Button>
      </Link>
    </div>
  );
}
