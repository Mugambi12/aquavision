import React from "react";
import "./Header.css";

const Header = ({ recipient }) => {
  return (
    <div className="chat-window-header">
      <div className="chat-window-header-recipient-name">{recipient.name}</div>
      <div className="chat-window-header-recipient-status">
        {recipient.status}
      </div>
    </div>
  );
};

export default Header;
