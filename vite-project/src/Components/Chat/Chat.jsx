import React, { useState } from 'react';
import { IconButton, Box } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import SendBox from '../ChatBox/SendBox';

const Chat = () => {
  const [drowe, setDrowe] = useState(false);

  const handleToggle = () => {
    console.log("Hello, I am Faiz!");
    setDrowe(!drowe);
  };

  return (
    <>
      <IconButton
        sx={{
          position: "fixed", // Fix the position relative to the viewport
          bottom: "20px",    // Distance from the bottom edge
          right: "20px",     // Distance from the right edge
          backgroundColor: "green", // Button background
          color: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect
          zIndex: 1000,      // Ensure it appears above other elements
          '&:hover': {       // Hover effect
            backgroundColor: "red",
          },
        }}
        onClick={handleToggle}
      >
        <ChatIcon />
      </IconButton>

      {drowe && (
        <SendBox/>
      )}
    </>
  );
};

export default Chat;
