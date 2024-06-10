import React, { useState, useEffect } from "react";
import "./EditUserForm.css";

const EditUserForm = ({ onSubmit, userData }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [houseSection, setHouseSection] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [role, setRole] = useState("basic");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (userData) {
      setFullName(userData.fullName || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      setHouseSection(userData.houseSection || "");
      setHouseNumber(userData.houseNumber || "");
      setRole(userData.adminRole ? "admin" : "basic");
      setIsActive(userData.isActive || false);
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...userData,
      fullName,
      email,
      phone,
      houseSection,
      houseNumber,
      adminRole: role === "admin",
      isActive,
    };
    onSubmit(updatedUser);
  };

  return (
    <div className="edit-user-container">
      <h2 className="modal-title">Update User Info</h2>
      <form onSubmit={handleSubmit} className="edit-user-form">
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
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="houseSection">House Section:</label>
          <input
            type="text"
            id="houseSection"
            placeholder="Enter house section"
            value={houseSection}
            onChange={(e) => setHouseSection(e.target.value)}
            required
          />
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
          <label>Role:</label>
          <div className="role-options">
            <div>
              <input
                type="radio"
                id="adminRole"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
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
                onChange={() => setRole("basic")}
              />
              <label htmlFor="basicRole">Basic</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Active:</label>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <button type="submit" className="submit-button">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
