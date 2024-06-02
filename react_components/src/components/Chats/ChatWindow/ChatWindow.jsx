import React, { useState, useRef, useEffect } from "react";
import "./ChatWindow.css";
import Header from "../Header/Header";

const ChatWindow = ({ chat }) => {
  const chatWindowRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chat]);

  let messageList = null;
  let recipient = null;

  if (chat) {
    recipient = chat.participants[0];
    messageList = chat.messages.map((message) => (
      <div
        key={message._id}
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
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("New message data:", {
        content: message,
        sender: "You",
        timestamp: new Date().toISOString(),
        is_read: false,
      });
      setMessage(""); // Clear the input field after sending the message
    }
  };

  return (
    <>
      {chat ? (
        <div className="chat-window-container">
          {recipient && <Header recipient={recipient} />}
          <div className="chat-window" ref={chatWindowRef}>
            {messageList}
          </div>
          <div className="chat-window-message-input">
            <input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={handleInputChange}
            />
            <button onClick={handleSendMessage}>
              <span>Send</span>
              <span className="material-symbols-rounded">send</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="chat-window-welcome-message">
          <h2 className="title">Welcome to Dakoke Springs Chat</h2>
          <p className="description">Start a conversation</p>
        </div>
      )}
    </>
  );
};

export default ChatWindow;
