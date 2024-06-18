import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Chats/Sidebar";
import ChatWindow from "../components/Chats/ChatWindow";
import Spinner from "../components/Spinner/Spinner";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch("/api/chats");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Chats data fetched successfully:");
        setChats(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chats:", error);
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

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
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Sidebar chats={chats} onChatSelect={handleChatSelection} />
            <ChatWindow chat={selectedChat} />
          </>
        )}
      </div>
    </>
  );
};

export default Chats;
