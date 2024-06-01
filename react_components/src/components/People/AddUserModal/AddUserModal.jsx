import React, { useState } from "react";
import Modal from "react-modal";
import "./AddUserModal.css";

const AddUserModal = ({ isOpen, onRequestClose, onAddUser }) => {
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
    onAddUser(newUser);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="add-user-modal"
      overlayClassName="overlay"
    >
      <div className="row">
        <h2 className="modal-title">Add New User</h2>
        <button className="close" onClick={onRequestClose}>
          X
        </button>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Full Name:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add User</button>
      </form>
    </Modal>
  );
};

export default AddUserModal;
