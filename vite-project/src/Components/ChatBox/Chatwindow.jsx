import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000"); // Replace with your backend URL

function Chat({ username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingIndicator, setTypingIndicator] = useState("");

  useEffect(() => {
    // Emit user joining
    socket.emit("join", { username });

    // Fetch initial messages
    axios.get("http://localhost:4000/api/messages").then((response) => {
      setMessages(response.data.reverse());
    });

    // Listen for new messages
    socket.on("chatMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Listen for typing
    socket.on("typing", ({ username, isTyping }) => {
      setTypingIndicator(isTyping ? `${username} is typing...` : "");
    });

    // Update online users
    socket.on("updateOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, [username]);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", { username, message });
      setMessage("");
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", { username, isTyping: e.target.value !== "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {username}!</h2>
      <div>
        <h4>Online Users:</h4>
        <ul>
          {onlineUsers.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
      {typingIndicator && <p style={{ fontStyle: "italic" }}>{typingIndicator}</p>}
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={handleTyping}
        style={{ width: "80%", marginRight: "10px" }}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default Chat;
