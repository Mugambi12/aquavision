import React from "react";
import { useForm } from "react-hook-form";
import "./EditRevenue.css";

const EditRevenue = ({ revenue, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: revenue,
  });

  const onSubmitForm = (data) => {
    onSubmit(data);
  };

  return (
    <div className="edit-revenue-container">
      <h2 className="edit-revenue-title">Edit Revenue</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="edit-revenue-form">
        <div className="form-group">
          <label htmlFor="customer">Customer Name</label>
          <input
            type="text"
            id="customer"
            placeholder="Customer name"
            {...register("customer", { required: "Customer name is required" })}
          />
          {errors.customer && (
            <p className="error-message">{errors.customer.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            placeholder="Amount"
            {...register("amount", { required: "Amount is required" })}
          />
          {errors.amount && (
            <p className="error-message">{errors.amount.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && (
            <p className="error-message">{errors.date.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="transaction_id">Transaction ID</label>
          <input
            type="text"
            id="transaction_id"
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
          <label htmlFor="payment_method">Payment Method</label>
          <input
            type="text"
            id="payment_method"
            placeholder="Payment Method"
            {...register("payment_method", {
              required: "Payment method is required",
            })}
          />
          {errors.payment_method && (
            <p className="error-message">{errors.payment_method.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            {...register("description")}
          />
          {errors.payment_method && (
            <p className="error-message">{errors.payment_method.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            placeholder="Status"
            {...register("status", { required: "Status is required" })}
          />
          {errors.status && (
            <p className="error-message">{errors.status.message}</p>
          )}
        </div>

        <div className="button-group">
          <button
            type="button"
            className="cancel-button"
            onClick={() => onSubmit(null)}
          >
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRevenue;
