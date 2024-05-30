import React, { useEffect } from "react";
import "./Navbar.css";

const Header = () => {
  useEffect(() => {
    const header = document.querySelector("[data-header]");
    const navToggleBtn = document.querySelector("[data-menu-toggle-btn]");

    const toggleNav = () => {
      header.classList.toggle("active");
    };

    navToggleBtn.addEventListener("click", toggleNav);

    return () => {
      navToggleBtn.removeEventListener("click", toggleNav);
    };
  }, []);

  return (
    <header className="header" data-header>
      <div className="container">
        {/* Logo */}
        <h1>
          <a href="#" className="logo">
            Dashboard
          </a>
        </h1>

        {/* Menu Toggle Button */}
        <button
          className="menu-toggle-btn icon-box"
          data-menu-toggle-btn
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-rounded icon">menu</span>
        </button>

        {/* Navigation Menu */}
        <nav className="navbar">
          <div className="container">
            <ul className="navbar-list">
              {/* Home */}
              <li>
                <a href="/home" className="navbar-link active icon-box">
                  <span className="material-symbols-rounded icon">apps</span>
                  <span>Home</span>
                </a>
              </li>
              {/* People */}
              <li>
                <a href="/people" className="navbar-link icon-box">
                  <span className="material-symbols-rounded icon">people</span>
                  <span>People</span>
                </a>
              </li>
              {/* Records */}
              <li>
                <a href="/records" className="navbar-link icon-box">
                  <span className="material-symbols-rounded icon">
                    schedule
                  </span>
                  <span>Records</span>
                </a>
              </li>
              {/* Payments */}
              <li>
                <a href="/payments" className="navbar-link icon-box">
                  <span className="material-symbols-rounded icon">
                    attach_money
                  </span>
                  <span>Payments</span>
                </a>
              </li>
              {/* Expenses */}
              <li>
                <a href="expenses" className="navbar-link icon-box">
                  <span className="material-symbols-rounded icon">
                    send_money
                  </span>
                  <span>Expenses</span>
                </a>
              </li>
              {/* Chats */}
              <li>
                <a href="/chats" className="navbar-link icon-box">
                  <span className="material-symbols-rounded icon">forum</span>
                  <span>Chats</span>
                </a>
              </li>
            </ul>

            {/* User Actions */}
            <ul className="user-action-list">
              {/* Notifications */}
              <li>
                <a href="#!" className="notification icon-box">
                  <span className="material-symbols-rounded icon">
                    notifications
                  </span>
                </a>
              </li>
              {/* Settings */}
              <li>
                <a href="settings" className="notification icon-box">
                  <span className="material-symbols-rounded icon">
                    settings
                  </span>
                </a>
              </li>
              {/* Profile */}
              <li>
                <a href="#" className="header-profile">
                  <figure className="profile-avatar">
                    <img
                      src="src/assets/default/profile.png"
                      alt="Profile Image"
                      width="32"
                      height="32"
                    />
                  </figure>
                  <div>
                    <p className="profile-title">Elizabeth Smith</p>
                    <p className="profile-subtitle">Admin</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
