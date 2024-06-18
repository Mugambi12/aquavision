import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Header = () => {
  useEffect(() => {
    const header = document.querySelector("[data-header]");
    const navToggleBtn = document.querySelector("[data-menu-toggle-btn]");
    const navLinks = document.querySelectorAll(".navbar-link");

    const toggleNav = () => {
      header.classList.toggle("active");
    };

    const handleNavLinkClick = (event) => {
      navLinks.forEach((link) => link.classList.remove("active"));

      event.currentTarget.classList.add("active");

      localStorage.setItem("activeLink", event.currentTarget.href);
    };

    navToggleBtn.addEventListener("click", toggleNav);

    navLinks.forEach((link) =>
      link.addEventListener("click", handleNavLinkClick)
    );

    const activeLink = localStorage.getItem("activeLink");
    if (activeLink) {
      const activeNavLink = [...navLinks].find(
        (link) => link.href === activeLink
      );
      if (activeNavLink) {
        activeNavLink.classList.add("active");
      }
    } else {
      const homeLink = document.querySelector(".navbar-link[href='/home']");
      if (homeLink) {
        homeLink.classList.add("active");
      }
    }

    return () => {
      navToggleBtn.removeEventListener("click", toggleNav);
      navLinks.forEach((link) =>
        link.removeEventListener("click", handleNavLinkClick)
      );
    };
  }, []);

  return (
    <header className="header" data-header>
      <div className="container">
        <h1>
          <Link to="/" className="logo">
            Dashboard
          </Link>
        </h1>

        <button
          className="menu-toggle-btn icon-box"
          data-menu-toggle-btn
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-rounded icon">menu</span>
        </button>

        <nav className="navbar">
          <div className="container">
            <ul className="navbar-list">
              <li>
                <Link to="/home" className="navbar-link icon-box">
                  <span className="material-symbols-rounded icon">apps</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/people" className="navbar-link icon-box">
                  <span className="material-symbols-rounded icon">people</span>
                  <span>People</span>
                </Link>
              </li>
              <li>
                <Link to="/invoices" className="navbar-link icon-box">
                  <span className="material-symbols-rounded icon">
                    schedule
                  </span>
                  <span>Invoices</span>
                </Link>
              </li>
              <li>
                <Link to="/transactions" className="navbar-link icon-box">
                  <span className="material-symbols-rounded icon">
                    attach_money
                  </span>
                  <span>Transactions</span>
                </Link>
              </li>
              <li>
                <Link to="/chats" className="navbar-link icon-box">
                  <span className="material-symbols-rounded icon">forum</span>
                  <span>Chats</span>
                </Link>
              </li>
            </ul>

            <ul className="user-action-list">
              <li>
                <Link
                  to="/settings"
                  className="navbar-link navbar-icons icon-box"
                >
                  <span className="material-symbols-rounded icon">
                    settings
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="navbar-icons icon-box">
                  <span className="material-symbols-rounded icon logout">
                    power_settings_new
                  </span>
                </Link>
              </li>
              <li>
                <Link to="#!" className="header-profile">
                  <figure className="profile-avatar">
                    <img
                      src="src/assets/images/static/profile.png"
                      alt="Profile Image"
                      width="32"
                      height="32"
                    />
                  </figure>
                  <div>
                    <p className="profile-title">Elizabeth Smith</p>
                    <p className="profile-subtitle">Admin</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
