import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Chats/Sidebar/Sidebar";
import ChatWindow from "../components/Chats/ChatWindow/ChatWindow";
import { chats } from "../db/chatsData";

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelection = (chatId) => {
    setSelectedChat(chats.find((chat) => chat._id === chatId));
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar chats={chats} onChatSelect={handleChatSelection} />
        <ChatWindow chat={selectedChat} />
      </div>
    </>
  );
};

export default Chats;
