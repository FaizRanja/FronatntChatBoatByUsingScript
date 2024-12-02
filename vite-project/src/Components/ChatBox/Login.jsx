import { Box, IconButton } from '@mui/material';
import React from 'react';
import CloseIcon from "@mui/icons-material/Close";

const Login = ({ handleLoginClose }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // background: 'linear-gradient(to bottom right, #6a11cb, #2575fc)', // Gradient background
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          width: '400px',
          height: '450px',
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
          padding: '24px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={handleLoginClose}
          sx={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            color: '#333',
            '&:hover': {
              color: '#ff4d4d', // Red hover color for close button
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Content */}
        <Box
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#333',
            marginBottom: '16px',
          }}
        >
          Welcome Back!
        </Box>
        <Box
          sx={{
            fontSize: '16px',
            color: '#555',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          Please login to continue
        </Box>
        {/* Add your login form or content here */}
        <Box
          sx={{
            width: '100%',
            height: '50px',
            backgroundColor: '#2575fc',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#1e63d8',
            },
          }}
        >
          Login
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
