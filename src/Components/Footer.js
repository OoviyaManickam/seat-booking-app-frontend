// src/components/Footer.js
import React from 'react';
import { Typography, TextField, Button, Box, Grid, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, Pinterest, Google } from '@mui/icons-material';

const footerStyle = {
    marginTop: '100px',
  backgroundColor: '#820000', 
  color: 'white',
  padding: '20px',
};

const socialMediaStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  marginBottom: '20px',
};

const footerLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  marginRight: '10px',
};

const Footer = () => {
  return (
    <Box style={footerStyle}>
      <Box style={socialMediaStyle}>
        <Link href="https://www.facebook.com" target="_blank" color="inherit">
          <Facebook />
        </Link>
        <Link href="https://twitter.com" target="_blank" color="inherit">
          <Twitter />
        </Link>
        <Link href="https://www.instagram.com" target="_blank" color="inherit">
          <Instagram />
        </Link>
        <Link href="https://www.pinterest.com" target="_blank" color="inherit">
          <Pinterest />
        </Link>
        <Link href="https://www.google.com" target="_blank" color="inherit">
          <Google />
        </Link>
      </Box>
      <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
        Copyright © 2024. All Rights Reserved By US
        <br />
        <br/>
        <Link href="/about" style={footerLinkStyle}>About</Link>
        <Link href="/terms" style={footerLinkStyle}>Terms Of Use</Link>
        <Link href="/privacy" style={footerLinkStyle}>Privacy Policy</Link>
        <Link href="/faq" style={footerLinkStyle}>FAQ</Link>
        <Link href="/feedback" style={footerLinkStyle}>Feedback</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
