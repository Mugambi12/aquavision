import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ chats, onChatSelect }) => {
  const [activeChatId, setActiveChatId] = useState(null);

  const handleChatSelection = (chatId) => {
    setActiveChatId(chatId);
    onChatSelect(chatId);
  };

  return (
    <div className="chats-sidebar">
      <div className="row">
        <h2>Chats</h2>
        <span className="material-symbols-rounded">add</span>
      </div>
      <div className="contacts">
        {chats.map((chat) => (
          <div
            key={chat._id}
            className={`chats-contact-item ${
              activeChatId === chat._id ? "active" : ""
            }`}
            onClick={() => handleChatSelection(chat._id)}
          >
            <img
              src={chat.participants[0].profileImage}
              alt={`${chat.participants[0].name}'s profile`}
              className="chats-profile-image"
            />
            <div className="chats-contact-info">
              <div className="chats-contact-name">
                {chat.participants[0].name}
              </div>
              <div className="chats-last-message-time">
                {chat.messages.length > 0
                  ? chat.messages[chat.messages.length - 1].timestamp
                  : ""}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
