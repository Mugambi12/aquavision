<<<<<<< HEAD
import React, { useState } from "react";
import "./AddRevenue.css";

const usersListData = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
  { id: 4, name: "Dana White" },
];

const AddRevenue = ({ onSubmit }) => {
  const [newRevenue, setNewRevenue] = useState({
    customer: "",
    amount: "",
    date: "",
    transactionId: "",
    paymentMethod: "",
    description: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRevenue({ ...newRevenue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newRevenue);
  };

  return (
    <div className="add-revenue-container">
      <h2 className="modal-title">Add Revenue</h2>
      <form onSubmit={handleSubmit} className="add-revenue-form">
        <div className="form-column">
          <label>
            Customer Name:
            <select
              name="customer"
              value={newRevenue.customer}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select customer
              </option>
              {usersListData.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={newRevenue.amount}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={newRevenue.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Transaction ID:
            <input
              type="text"
              name="transactionId"
              placeholder="Enter transaction ID"
              value={newRevenue.transactionId}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-column">
          <label>
            Payment Method:
            <input
              type="text"
              name="paymentMethod"
              placeholder="Enter payment method"
              value={newRevenue.paymentMethod}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              rows={8}
              name="description"
              placeholder="Enter description"
              value={newRevenue.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={newRevenue.status}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </label>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => onSubmit(null)}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Add Revenue
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRevenue;
=======
import React, { useState } from "react";
import "./AddRevenue.css";

const usersListData = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
  { id: 4, name: "Dana White" },
];

const AddRevenue = ({ onSubmit }) => {
  const [newRevenue, setNewRevenue] = useState({
    customer: "",
    amount: "",
    date: "",
    transactionId: "",
    paymentMethod: "",
    description: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRevenue({ ...newRevenue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newRevenue);
  };

  return (
    <div className="add-revenue-container">
      <h2 className="modal-title">Add Revenue</h2>
      <form onSubmit={handleSubmit} className="add-revenue-form">
        <div className="form-column">
          <label>
            Customer Name:
            <select
              name="customer"
              value={newRevenue.customer}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select customer
              </option>
              {usersListData.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={newRevenue.amount}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={newRevenue.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Transaction ID:
            <input
              type="text"
              name="transactionId"
              placeholder="Enter transaction ID"
              value={newRevenue.transactionId}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-column">
          <label>
            Payment Method:
            <input
              type="text"
              name="paymentMethod"
              placeholder="Enter payment method"
              value={newRevenue.paymentMethod}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              rows={8}
              name="description"
              placeholder="Enter description"
              value={newRevenue.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={newRevenue.status}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </label>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => onSubmit(null)}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Add Revenue
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRevenue;
>>>>>>> af63ca625c0f0be29c1a848edb859c9b29bc2b7b
