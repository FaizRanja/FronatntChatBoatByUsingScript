import React, { useState, useRef, useEffect } from 'react';
import { IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import SendBox from '../ChatBox/SendBox';


const Chat = () => {
  const [drowe, setDrowe] = useState(false); // State for SendBox visibility
  const [loginDrower, setLoginDrower] = useState(false); // State for Login visibility

  const loginRef = useRef(null); // Ref for Login

  const handleToggle = () => {
    setDrowe(!drowe);
  };

  const handleColse = () => {
    setDrowe(false);
    setLoginDrower(false);
  };

  const handleLogin = () => {
    setLoginDrower(!loginDrower);
  };

  // handle close login
  const handleLoginClose=()=>{
    setLoginDrower(false)
  }

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        loginRef.current &&
        !loginRef.current.contains(event.target)
      ) {
        setLoginDrower(false); // Close the login drawer instead of toggling
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <ChatIcon sx={{ fontSize: "2rem" }} />
      </IconButton>

      {drowe && (
        <SendBox handleclose={handleColse} handlelogin={handleLogin} />
        // <HelloIamChat/>
      )}

      {/* {loginDrower && (
        <div ref={loginRef}>
          <Login  handleLoginClose={handleLoginClose} />
        </div>
      )} */}
    </>
  );
};

export default Chat;
