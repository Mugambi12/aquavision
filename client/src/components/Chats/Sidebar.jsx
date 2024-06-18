import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ chats, onChatSelect }) => {
  const [activeChatId, setActiveChatId] = useState(null);
  const [showContacts, setShowContacts] = useState(false);

  const handleChatSelection = (chatId) => {
    setActiveChatId(chatId);
    onChatSelect(chatId);
    setShowContacts(false);
  };

  const toggleContacts = () => {
    setShowContacts(!showContacts);
  };

  return (
    <>
      <div className="chats-media-screens">
        <div className="open-chats" onClick={toggleContacts}>
          <span className="material-symbols-rounded">segment</span>
        </div>
        <div className="start-new-chat">
          <span className="material-symbols-rounded">person_search</span>
        </div>
      </div>

      <div className={`chats-sidebar ${showContacts ? "show-contacts" : ""}`}>
        <div className="d-flex">
          <h2>Chats</h2>
          <span className="material-symbols-rounded">person_search</span>
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
    </>
  );
};

export default Sidebar;
