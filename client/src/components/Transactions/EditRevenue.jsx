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

    console.log("This is the form data: ", data);
  };

  return (
    <div className="edit-revenue-container">
      <h2 className="edit-revenue-title">Edit Revenue</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="edit-revenue-form">
        <div className="form-group">
          <label htmlFor="full_name">Customer Name</label>
          <input
            type="text"
            id="full_name"
            placeholder="Full name"
            {...register("full_name", { required: "Full name is required" })}
          />
          {errors.full_name && (
            <p className="error-message">{errors.full_name.message}</p>
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
          <label htmlFor="payment_date">Payment Date</label>
          <input
            type="date"
            id="payment_date"
            {...register("payment_date", {
              required: "Payment date is required",
            })}
          />
          {errors.payment_date && (
            <p className="error-message">{errors.payment_date.message}</p>
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
          <label htmlFor="payment_status">Payment Status</label>
          <input
            type="text"
            id="payment_status"
            placeholder="Payment sStatus"
            {...register("payment_status", {
              required: "Payment status is required",
            })}
          />
          {errors.payment_status && (
            <p className="error-message">{errors.payment_status.message}</p>
          )}
        </div>

        <div className="button-group">
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRevenue;
