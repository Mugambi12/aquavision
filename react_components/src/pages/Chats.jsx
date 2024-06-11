import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Chats - Dakoke Springs</title>
      </Helmet>
      <Navbar />
      <div className="general-chat-container">
        <Sidebar chats={chats} onChatSelect={handleChatSelection} />
        <ChatWindow chat={selectedChat} />
      </div>
    </>
  );
};

export default Chats;
