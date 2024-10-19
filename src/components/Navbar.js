// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link } from 'react-router-dom';

const Navbar = ({ studentName }) => {
  return (
    <AppBar position="fixed" sx={{ top: 'auto', top: 0, backgroundColor: '#3f51b5' }}>
      <Toolbar>
        {/* Logo with Slogan */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
            <QuizIcon sx={{ marginRight: 1 }} /> EasyQuiz
          </Typography>
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            Powered by Avis Computers
          </Typography>
        </Box>

        {/* Quiz and Admin Links with Icons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box
            component={Link}
            to="/mcqs"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <QuizIcon sx={{ marginRight: 0.5 }} />
            <Typography variant="button">Quiz</Typography>
          </Box>
          <Box
            component={Link}
            to="/admin"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AdminPanelSettingsIcon sx={{ marginRight: 0.5 }} />
            <Typography variant="button">Admin</Typography>
          </Box>
        </Box>

        {/* Student Name */}
        {studentName && (
          <Typography variant="h6" sx={{ marginLeft: 'auto' }}>
            Welcome, {studentName}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
