import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { register } from '../../utils/requestUtils';

export default function FullListLink({ userStatus }) {
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
    whiteSpace: 'nowrap',
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
  
  const registerNewUser = async () => {
    const credentials = {
      username: "Spencer",
      password: "talonted2",
    };
    const response = await register(credentials);
    console.log("RESPONSE: " + JSON.stringify(response));

  }


  const clickButton = async (e) => {
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.75)'; // Adjust the alpha value for the click color
    // const status = await getUserStatus();
    // console.log("STATUS: " + JSON.stringify(status));
    await registerNewUser();
  };

  const welcomeText = userStatus.isAuthenticated ? `Welcome, ${userStatus.username}` : 'Welcome';

  return (
    <div style={containerStyle}>
      <div style={welcomeTextStyle}>{welcomeText}</div>
      <Link to="/list" style={{ textDecoration: 'none' }}>
        <Button
          style={visitButtonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = hoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = visitButtonStyle.backgroundColor}
          onClick={clickButton} >
          Visit the Full List
        </Button>
      </Link>
    </div>
  );
}
