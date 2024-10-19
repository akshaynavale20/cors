// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#3f51b5', top: 'auto', bottom: 0,color: '#fff', padding: '10px', textAlign: 'center' }}>
      <Typography variant="body2">
        © 2024 EasyQuiz. All Rights Reserved. Powered by Avis Computers.
      </Typography>
    </Box>
  );
};

export default Footer;
