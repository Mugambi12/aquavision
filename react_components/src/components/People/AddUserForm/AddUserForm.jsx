import React, { useState } from "react";
import "./AddUserForm.css";

const AddUserForm = ({ onSubmit }) => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now().toString(),
      profileImage: "default-profile.png",
      fullName,
      gender,
      age,
    };
    onSubmit(newUser);
  };

  return (
    <>
      <h2 className="modal-title">Add New User</h2>
      <form onSubmit={handleSubmit} className="add-user-form">
        <label>Full Name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <label>Gender:</label>
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        />
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
    </>
  );
};

export default AddUserForm;
