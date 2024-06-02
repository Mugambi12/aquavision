import React, { useRef, useEffect } from "react";
import "./ChatWindow.css";
import Header from "../Header/Header";

const ChatWindow = ({ chat }) => {
  const chatWindowRef = useRef(null);

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

  return (
    <>
      {chat ? (
        <div className="chat-window-container">
          {recipient && <Header recipient={recipient} />}
          <div className="chat-window" ref={chatWindowRef}>
            {messageList}
          </div>
          <div className="chat-window-message-input">
            <input type="text" placeholder="Type a message" />
            <button>
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
