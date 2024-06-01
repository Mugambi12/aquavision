// AddInvoiceForm.js
import React, { useState } from "react";
import "./AddInvoiceForm.css";

const AddInvoiceForm = ({ onSubmit }) => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInvoice = {
      id: Date.now().toString(),
      profileImage: "default-profile.png",
      fullName,
      gender,
      age,
    };
    onSubmit(newInvoice);
  };

  return (
    <>
      <h2 className="modal-title">Add New Invoice</h2>
      <form onSubmit={handleSubmit} className="add-invoice-form">
        <label>House Section:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <label>House Number:</label>
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        />
        <label>Meter Reading:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">Add Invoice</button>
      </form>
    </>
  );
};

export default AddInvoiceForm;
