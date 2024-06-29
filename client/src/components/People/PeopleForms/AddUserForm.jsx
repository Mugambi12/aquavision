import React, { useState } from "react";
import "./AddUserForm.css";

const AddUserForm = ({ onSubmit, houseSections }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [houseSection, setHouseSection] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [role, setRole] = useState("basic");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now().toString(),
      profileImage: "default-profile.png",
      fullName,
      email,
      phoneNumber,
      houseSection,
      houseNumber,
      isAdmin: role === "admin",
      isBasic: role === "basic",
    };
    onSubmit(newUser);
  };

  return (
    <div className="add-user-container">
      <h2 className="modal-title">Add New User</h2>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <div className="role-options">
            <div>
              <input
                type="radio"
                id="adminRole"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="adminRole">Admin</label>
            </div>
            <div>
              <input
                type="radio"
                id="basicRole"
                name="role"
                value="basic"
                checked={role === "basic"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="basicRole">Basic</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="houseSection">House Section:</label>
          <select
            id="houseSection"
            value={houseSection}
            onChange={(e) => setHouseSection(e.target.value)}
            required
          >
            <option value="" disabled>
              Select house section
            </option>
            {houseSections.services.house_sections.map((section) => (
              <option key={section._id} value={section.section}>
                {section.section}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="houseNumber">House Number:</label>
          <input
            type="text"
            id="houseNumber"
            placeholder="Enter house number"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
