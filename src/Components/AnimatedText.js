import React from 'react';
import Typewriter from 'typewriter-effect';

const AnimatedText = () => {
  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
    marginTop: '-40px',
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'white', 
  };

  const colorThemeStyle = {
    color: '#ff5722', 
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    color: 'red',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        <span className="d-block">Book your</span> tickets for 
        <span style={colorThemeStyle}>
          <Typewriter
            options={{
              strings: ['Movies', 'Events', 'Concerts'],
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

export default AnimatedText;
