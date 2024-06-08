import React, { useState, useEffect } from "react";
import "./EditUserForm.css";

const EditUserForm = ({ onSubmit, userData }) => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  // Update state with user data when userData prop changes
  useEffect(() => {
    if (userData) {
      setFullName(userData.fullName || "");
      setGender(userData.gender || "");
      setAge(userData.age || "");
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...userData, // Preserve existing user data
      fullName,
      gender,
      age,
    };
    onSubmit(updatedUser);
  };

  return (
    <div className="add-user-container">
      <h2 className="modal-title">Update Personal Info</h2>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
