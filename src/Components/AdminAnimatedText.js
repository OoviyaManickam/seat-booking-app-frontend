import { Margin } from '@mui/icons-material';
import React from 'react';
import Typewriter from 'typewriter-effect';
 
const AdminAnimatedText = () => {
  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
    marginTop: '160px',
  };
 
  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'white',
    marginTop: '50px',
  };
 
  const colorThemeStyle = {
    color: 'red',
    marginTop: '50px',
   
  };
 
  const paragraphStyle = {
    fontSize: '1.2rem',
    color: 'red',
  };
 
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        <span className="d-block">Welcome to the admin dashboard</span> <br/>
        <span style={colorThemeStyle}>
          <Typewriter
            options={{
              strings: ['Add', 'Update', 'Delete'],
              autoStart: true,
              loop: true,
              delay: 75,
            }}
          />
        </span>
      </h1>
      <p style={paragraphStyle}>Safe, secure, reliable ticketing. Your ticket to live entertainment!</p>
    </div>
  );
};
 
export default AdminAnimatedText;