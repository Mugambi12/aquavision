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
      <form onSubmit={handleSubmit(onSubmitForm)} className="add-expense-form">
        <div className="form-group">
          <label htmlFor="vendor">Vendor</label>
          <input
            id="vendor"
            type="text"
            placeholder="Vendor name"
            {...register("vendor", { required: "Vendor is required" })}
          />
          {errors.vendor && (
            <p className="error-message">{errors.vendor.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            {...register("type", { required: "Type is required" })}
          >
            <option value="">Select type</option>
            <option value="Salary">Salary</option>
            <option value="Bonus">Bonus</option>
            <option value="Travel">Travel</option>
            {/* Add more options as needed */}
          </select>
          {errors.type && (
            <p className="error-message">{errors.type.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            placeholder="Description of expense"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="error-message">{errors.description.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
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
          <label htmlFor="payment_method">Payment Method</label>
          <input
            id="payment_method"
            type="text"
            placeholder="Payment method"
            {...register("payment_method", {
              required: "Payment method is required",
            })}
          />
          {errors.payment_method && (
            <p className="error-message">{errors.payment_method.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="transaction_id">Transaction ID</label>
          <input
            id="transaction_id"
            type="text"
            placeholder="Transaction ID"
            {...register("transaction_id", {
              required: "Transaction ID is required",
            })}
          />
          {errors.transaction_id && (
            <p className="error-message">{errors.transaction_id.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            placeholder="Amount"
            {...register("amount", { required: "Amount is required" })}
          />
          {errors.amount && (
            <p className="error-message">{errors.amount.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="payment_status">Payment Status</label>
          <select
            id="payment_status"
            {...register("payment_status", {
              required: "Payment status is required",
            })}
          >
            <option value="">Select payment status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            {/* Add more options as needed */}
          </select>
          {errors.payment_status && (
            <p className="error-message">{errors.payment_status.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="approval_status">Approval Status</label>
          <select
            id="approval_status"
            {...register("approval_status", {
              required: "Approval status is required",
            })}
          >
            <option value="">Select status</option>
            <option value="Completed">Completed</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          {errors.approval_status && (
            <p className="error-message">{errors.approval_status.message}</p>
          )}
        </div>

        <div className="form-group">
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "Submitting..." : "Add Revenue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;