import React, { useState } from "react";
import "./EditRevenue.css";

const EditRevenue = ({ revenue, onSubmit }) => {
  const [editedRevenue, setEditedRevenue] = useState(revenue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRevenue({ ...editedRevenue, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(editedRevenue);
  };

  return (
    <div className="edit-revenue-container">
      <h2>Edit Revenue</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            name="customer"
            value={editedRevenue.customer}
            onChange={handleChange}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={editedRevenue.amount}
            onChange={handleChange}
          />
        </label>

        <div className="d-flex">
          <button type="button" onClick={() => onSubmit(null)}>
            Cancel
          </button>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditRevenue;
