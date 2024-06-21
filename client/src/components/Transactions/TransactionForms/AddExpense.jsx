import React from "react";
import { useForm } from "react-hook-form";
import "./AddExpense.css";

const AddExpense = ({ onSubmit, submitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitForm = async (data) => {
    onSubmit(data);
  };

  return (
    <div className="add-expense-container">
      <h2 className="add-expense-title">Add Expense</h2>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="add-expense-form">
          <div className="form-group">
            <label htmlFor="vendor">Vendor:</label>
            <input
              id="vendor"
              type="text"
              placeholder="Enter vendor name"
              {...register("vendor", { required: "Vendor is required" })}
            />
            {errors.vendor && (
              <p className="error-message">{errors.vendor.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              {...register("type", { required: "Type is required" })}
            >
              <option value="">Select type</option>
              <option value="Equipment Maintenance">
                Equipment Maintenance
              </option>
              <option value="Utility Bills">Utility Bills</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Employee Salaries">Employee Salaries</option>
              <option value="Transportation">Transportation</option>
              <option value="Water Treatment Chemicals">
                Water Treatment Chemicals
              </option>
              <option value="Consulting Services">Consulting Services</option>
              <option value="Training and Development">
                Training and Development
              </option>
              <option value="Customer Service">Customer Service</option>
              {/* Add more options as needed */}
            </select>
            {errors.type && (
              <p className="error-message">{errors.type.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              id="date"
              type="date"
              {...register("date", { required: "Date is required" })}
            />
            {errors.date && (
              <p className="error-message">{errors.date.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              id="amount"
              type="number"
              placeholder="Enter amount"
              {...register("amount", { required: "Amount is required" })}
            />
            {errors.amount && (
              <p className="error-message">{errors.amount.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="payment_method">Payment Method:</label>
            <input
              id="payment_method"
              type="text"
              placeholder="Enter payment method"
              {...register("payment_method", {
                required: "Payment method is required",
              })}
            />
            {errors.payment_method && (
              <p className="error-message">{errors.payment_method.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="payment_status">Payment Status:</label>
            <select
              id="payment_status"
              {...register("payment_status", {
                required: "Payment status is required",
              })}
            >
              <option value="">Select payment status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="failed">Failed</option>
              {/* Add more options as needed */}
            </select>
            {errors.payment_status && (
              <p className="error-message">{errors.payment_status.message}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="submit-button" disabled={submitting}>
            {submitting ? "Submitting..." : "Add Expense"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
