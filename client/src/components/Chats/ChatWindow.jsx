import React, { useState, useRef, useEffect } from "react";
import "./ChatWindow.css";
import Header from "./Header";
import { postMessage } from "../../apis/ApiChats";

const ChatWindow = ({ chat, refreshChats }) => {
  const chatWindowRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chat]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const timestamp = new Date().toLocaleString("en-US", {
        timeZone: userTimezone,
      });

      const newMessage = {
        content: message,
        sender: "You",
        timestamp,
        is_read: false,
      };

      try {
        await postMessage(newMessage);
        refreshChats(); // Refresh chats after posting a new message
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  if (!chat) {
    return (
      <div className="chat-window-welcome-message">
        <h2 className="title">Welcome to Dakoke Springs Chat</h2>
        <p className="description">Start a conversation</p>
      </div>
    );
  }

  const recipient = chat.participants[0];
  const messageList = chat.messages.map((message, index) => (
    <div
      key={index}
      className={`chat-window-message-item ${
        message.sender === "You" ? "sent" : "received"
      }`}
    >
      <div className="chat-window-message-content">{message.content}</div>
      <div className="chat-window-message-time">
        <span>{message.timestamp}</span>
        {message.is_read ? (
          <span className="message-read">Read</span>
        ) : (
          <span className="message-unread">Unread</span>
        )}
      </div>
    </div>
  ));

  return (
    <div className="chat-window-container">
      <Header recipient={recipient} />
      <div className="chat-window" ref={chatWindowRef}>
        {messageList}
      </div>
      <div className="chat-window-message-input">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={handleInputChange}
          aria-label="Type a message"
        />
        <button onClick={handleSendMessage} aria-label="Send message">
          <span>Send</span>
          <span className="material-symbols-rounded">send</span>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
