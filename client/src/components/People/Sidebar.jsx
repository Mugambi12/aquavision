// Sidebar.js
import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({
  people,
  onPersonClick,
  setIsCreateModalOpen,
  isSidebarOpen,
  toggleSidebar,
}) => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    if (!selectedPerson && people.length > 0) {
      const firstPerson = people[0];
      setSelectedPerson(firstPerson);
      onPersonClick(firstPerson);
    }
  }, [people, selectedPerson, onPersonClick]);

  const handleClick = (person) => {
    setSelectedPerson(person);
    onPersonClick(person);
  };

  return (
    <>
      <div className="sidebar-media-screens">
        <div className="open-sidebar" onClick={toggleSidebar}>
          <span className="material-symbols-rounded">{`${
            isSidebarOpen ? "close" : "segment"
          }`}</span>
        </div>
        <div className="start-new-chat">
          <span
            className="material-symbols-rounded"
            onClick={() => setIsCreateModalOpen(true)}
          >
            add
          </span>
        </div>
      </div>

      <div className={`sidebar ${isSidebarOpen ? "show" : "hide"}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">People</h2>
          <div className="sidebar-header-icons">
            <span className="material-symbols-rounded icon">search</span>
            <span
              className="material-symbols-rounded icon add"
              onClick={() => setIsCreateModalOpen(true)}
            >
              add
            </span>
          </div>
        </div>

        <ul className="people-list">
          {people.map((person) => (
            <li
              key={person.id}
              className={`person-item ${
                selectedPerson && selectedPerson.id === person.id
                  ? "active"
                  : ""
              }`}
              onClick={() => handleClick(person)}
            >
              <img
                src={person.profileImage}
                alt="Profile"
                className="profile-image"
              />
              <div className="user-info">
                <span className="full-name">{person.fullName}</span>
                <span className="gender-age">
                  {person.gender}, {person.age}
                </span>
              </div>
              <span className="material-symbols-rounded icon">more_vert</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
