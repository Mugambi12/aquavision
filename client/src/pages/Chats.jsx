import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/Chats/Sidebar";
import ChatWindow from "../components/Chats/ChatWindow";
import Spinner from "../components/spinner/Spinner";
import { fetchMessage } from "../apis/ApiChats";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadChats = async () => {
      setLoading(true);
      try {
        const data = await fetchMessage();
        setChats(data);
      } catch (error) {
        setError("Failed to fetch chats.");
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };
    loadChats();
  }, []);

  const refreshChats = async () => {
    setLoading(true);
    try {
      const data = await fetchMessage();
      setChats(data);
      if (selectedChat) {
        setSelectedChat(data.find((chat) => chat._id === selectedChat._id));
      }
    } catch (error) {
      console.error("Error refreshing chats:", error);
    } finally {
      setLoading(false);
    }
  };

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
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <Sidebar chats={chats} onChatSelect={handleChatSelection} />
            <ChatWindow chat={selectedChat} refreshChats={refreshChats} />
          </>
        )}
      </div>
    </>
  );
};

export default Chats;
