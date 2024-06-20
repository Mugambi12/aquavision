import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  fetchUnpaidInvoice,
  fetchActiveUsersList,
} from "../../../resources/apiRevenue";
import "./AddRevenue.css";

const AddRevenue = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [usersListData, setUsersListData] = useState([]);
  const [unpaidInvoicesList, setUnpaidInvoicesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          callApiAndGetUnpaidInvoicesList(),
          callApiAndGetActiveUsersList(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const callApiAndGetUnpaidInvoicesList = async () => {
    try {
      const data = await fetchUnpaidInvoice();
      setUnpaidInvoicesList(data);
    } catch (error) {
      console.error("Error fetching unpaid invoices list:", error);
    }
  };

  const callApiAndGetActiveUsersList = async () => {
    try {
      const data = await fetchActiveUsersList();
      setUsersListData(data);
    } catch (error) {
      console.error("Error fetching users list:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitForm = async (data) => {
    setSubmitting(true);
    try {
      const formattedData = {
        user_id: data.user_id,
        invoice_id: data.invoice_id,
        amount: data.amount,
        payment_date: data.payment_date,
        transaction_id: data.transaction_id,
        payment_method: data.payment_method,
        payment_status: data.payment_status,
        phone_number: data.phone_number,
      };

      await onSubmit(formattedData);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="add-revenue-container">
          <h2 className="modal-title">Add Revenue</h2>
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="add-revenue-form"
          >
            <div className="form-group">
              <label htmlFor="user_id">Customer Name:</label>
              <select id="user_id" {...register("user_id", { required: true })}>
                <option value="" disabled>
                  Select customer
                </option>
                {usersListData.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.full_name}, {user.house_section}, {user.house_number}
                  </option>
                ))}
              </select>
              {errors.user_id && (
                <p className="error-message">Customer is required</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                id="amount"
                type="number"
                {...register("amount", { required: true })}
                placeholder="Enter amount"
              />
              {errors.amount && (
                <p className="error-message">Amount is required</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="payment_date">Payment Date:</label>
              <input
                id="payment_date"
                type="date"
                {...register("payment_date", { required: true })}
                placeholder="Enter payment date"
              />
              {errors.payment_date && (
                <p className="error-message">Payment date is required</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="transaction_id">Transaction ID:</label>
              <input
                id="transaction_id"
                type="text"
                {...register("transaction_id", { required: true })}
                placeholder="Enter transaction ID"
              />
              {errors.transaction_id && (
                <p className="error-message">Transaction ID is required</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="invoice_id">Unpaid Invoices:</label>
              <select
                id="invoice_id"
                {...register("invoice_id", { required: true })}
              >
                <option value="" disabled>
                  Select invoice
                </option>
                {unpaidInvoicesList.map((invoice) => (
                  <option key={invoice._id} value={invoice._id}>
                    {invoice.house_section}, {invoice.house_number},{" "}
                    {invoice.total_amount}
                  </option>
                ))}
              </select>
              {errors.invoice_id && (
                <p className="error-message">Invoice is required</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="payment_method">Payment Method:</label>
              <input
                id="payment_method"
                type="text"
                {...register("payment_method", { required: true })}
                placeholder="Enter payment method"
              />
              {errors.payment_method && (
                <p className="error-message">Payment method is required</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">Phone Number:</label>
              <input
                id="phone_number"
                type="text"
                {...register("phone_number", { required: true })}
                placeholder="Enter phone number"
              />
              {errors.phone_number && (
                <p className="error-message">Phone number is required</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="payment_status">Status:</label>
              <div className="d-flex">
                <label>
                  <input
                    type="radio"
                    {...register("payment_status", { required: true })}
                    value="Completed"
                  />
                  Completed
                </label>
                <label>
                  <input
                    type="radio"
                    {...register("payment_status", { required: true })}
                    value="Cancelled"
                  />
                  Cancelled
                </label>
              </div>
              {errors.payment_status && (
                <p className="error-message">Status is required</p>
              )}
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="submit-btn"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Add Revenue"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddRevenue;
