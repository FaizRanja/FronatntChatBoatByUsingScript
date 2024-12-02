import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Paper,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";
import { io } from "socket.io-client";

const SendBox = ({ handleclose, handlelogin }) => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(""); // Use username state correctly
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false); // Loader for fetching older messages
  const [allMessagesLoaded, setAllMessagesLoaded] = useState(false); // Track if all messages are loaded
  const chatAreaRef = useRef(null); // Ref for the chat area
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingIndicator, setTypingIndicator] = useState("");

  const socket = io("http://localhost:4000", {
    transports: ["websocket", "polling"], // Use fallback transports
  });

  // Mock initial messages
  useEffect(() => {
    scrollToBottom();
    // Emit join event
    socket.emit("join", { username });
    // Fetch initial messages
    axios.get("http://localhost:4000/api/messages").then((response) => {
      setMessages(response.data);
    });

    // Listen for new messages
    socket.on("chatMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Listen for typing indicator
    socket.on("typing", ({ username, isTyping }) => {
      setTypingIndicator(isTyping ? `${username} is typing...` : "");
    });

    // Update online users
    socket.on("updateOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // Cleanup on component unmount
    return () => {
      socket.off(); // remove all listeners
    };
  }, [username]);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMessages((prevMessages) => [
        { content: file.name, type: "file", sender: "user", file },
        ...prevMessages,
      ]);
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", { username, isTyping: e.target.value !== "" });
  };
  // Handle message sending
  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", { username, content: message });
      setMessages((prevMessages) => [
        { content: message, type: "text", sender: "user" },
        ...prevMessages,
      ]);
      setMessage(""); // Clear input
      // Mock reply from recipient
      // setTimeout(() => {
      //   setMessages((prevMessages) => [
      //     {
      //       content: `Reply to: ${message}`,
      //       type: "text",
      //       sender: "recipient",
      //     },
      //     ...prevMessages,
      //   ]);
      //   scrollToBottom();
      // }, 1000);
    } else if (selectedFile) {
      console.log("File sent:", selectedFile.name);

      // Mock reply for sent file
      setTimeout(() => {
        setMessages((prevMessages) => [
          {
            content: `Received your file: ${selectedFile.name}`,
            type: "text",
            sender: "recipient",
          },
          ...prevMessages,
        ]);
        setSelectedFile(null);
      }, 1000);
    }
  };

  // Handle "Enter" key for sending a message
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  // Scroll to the bottom of the chat area
  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  };

  // Fetch older messages when user scrolls to the top
  const handleScroll = (event) => {
    if (event.target.scrollTop === 0 && !loading && !allMessagesLoaded) {
      setLoading(true);

      // Mock fetching older messages
      setTimeout(() => {
        const olderMessages = [
          { content: "Older message 3", type: "text", sender: "user" },
          { content: "Older message 4", type: "text", sender: "recipient" },
        ];

        if (olderMessages.length === 0) {
          setAllMessagesLoaded(true);
        } else {
          const currentScrollHeight = chatAreaRef.current.scrollHeight;
          setMessages((prevMessages) => [...olderMessages, ...prevMessages]);
          setTimeout(() => {
            chatAreaRef.current.scrollTop =
              chatAreaRef.current.scrollHeight - currentScrollHeight;
          }, 0);
        }
        setLoading(false);
      }, 1500);
    }
  };
  // Render each message based on its type (text or file)
  const renderMessage = (msg, index) => {
    const isUser = msg.sender === "user";
    return (
      <Box
        key={index}
        sx={{
          alignSelf: isUser ? "flex-end" : "flex-start",
          backgroundColor: isUser ? "#00bcd4" : "black",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "20px",
          maxWidth: "75%",
          wordBreak: "break-word",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          marginBottom: "10px",
          animation: "fadeIn 0.5s ease-out",
        }}
      >
        {msg.type === "text" ? (
          msg.content
        ) : // Check if the file is an object URL (i.e., a valid file to display)
        msg.file && msg.file instanceof Blob ? (
          <a
            href={URL.createObjectURL(msg.file)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            {msg.file.name}
          </a>
        ) : (
          <span>{msg.content}</span>
        )}
      </Box>
    );
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: "5rem",
        right: "20px",
        width: {
          xs: "90%", // For small screens
          sm: "80%", // For medium screens
          md: "380px", // Default for larger screens
        },
        height: {
          xs: "70vh", // For small screens
          sm: "70vh", // For medium screens
          md: "450px", // Default for larger screens
        },
        backgroundColor: "#f9f9f9",
        border: "1px solid #e0e0e0",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          Chat with Us
        </Typography>
        <IconButton onClick={handleclose}>
          <CloseIcon sx={{ color: "#555" }} />
        </IconButton>
      </Box>

      {/* Chat area */}
      <Box
        ref={chatAreaRef}
        onScroll={handleScroll}
        sx={{
          flex: 1,
          marginY: "16px",
          overflowY: "auto",
          padding: "8px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column-reverse",
          gap: "8px",
          scrollBehavior: "smooth",
        }}
      >
        {/* Welcome Message */}
        {messages.length === 0 && (
          <Box
            sx={{
              padding: "15px",
              backgroundColor: "#ff8a00",
              borderRadius: "10px",
              textAlign: "center",
              color: "#fff",
            }}
          >
            <Typography>Welcome! Start typing to chat with us.</Typography>

            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Please enter username"
              variant="outlined"
              fullWidth
              size="small"
              sx={{ marginRight: "10px" }}
            />
          </Box>
        )}
        {/* Render Messages */}
        {messages.map((msg, index) => renderMessage(msg, index))}
      </Box>
      {/* Typing Indicator */}
      {typingIndicator && (
        <Box
          sx={{
            padding: "8px",
            backgroundColor: "#eee",
            borderRadius: "10px",
            fontStyle: "italic",
          }}
        >
          {typingIndicator}
        </Box>
      )}
      {/* Input field and Send Button */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          value={message}
          onChange={handleTyping}
          onKeyPress={handleKeyPress}
          variant="outlined"
          fullWidth
          size="small"
          sx={{ marginRight: "10px" }}
        />
        <input
          type="file"
          accept="image/*,video/*,audio/*,application/pdf"
          style={{ display: "none" }}
          id="fileInput"
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput">
          <IconButton
            component="span"
            sx={{
              borderRadius: "50%",
              backgroundColor: "#f5f5f5",
              marginRight: "8px",
            }}
          >
            <AttachFileIcon />
          </IconButton>
        </label>
        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{
            backgroundColor: "#00bcd4",
            "&:hover": {
              backgroundColor: "#0097a7",
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default SendBox;
