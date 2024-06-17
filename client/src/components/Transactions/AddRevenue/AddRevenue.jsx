import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./AddRevenue.css";
import {
  fetchUnpaidInvoice,
  fetchActiveUsersList,
} from "../../../resources/apiRevenue";

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
            <div className="form-column">
              <label>
                Customer Name:
                <select {...register("user_id", { required: true })}>
                  <option value="" disabled>
                    Select customer
                  </option>
                  {usersListData.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.full_name}, {user.house_section},{" "}
                      {user.house_number}
                    </option>
                  ))}
                </select>
                {errors.user_id && (
                  <span className="error">Customer is required</span>
                )}
              </label>

              <label>
                Amount:
                <input
                  type="number"
                  {...register("amount", { required: true })}
                  placeholder="Enter amount"
                />
                {errors.amount && (
                  <span className="error">Amount is required</span>
                )}
              </label>

              <label>
                Payment Date:
                <input
                  type="date"
                  {...register("payment_date", { required: true })}
                  placeholder="Enter payment date"
                />
                {errors.payment_date && (
                  <span className="error">Payment date is required</span>
                )}
              </label>

              <label>
                Transaction ID:
                <input
                  type="text"
                  {...register("transaction_id", { required: true })}
                  placeholder="Enter transaction ID"
                />
                {errors.transaction_id && (
                  <span className="error">Transaction ID is required</span>
                )}
              </label>
            </div>

            <div className="form-column">
              <label>
                Unpaid Invoices:
                <select {...register("invoice_id", { required: true })}>
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
                  <span className="error">Invoice is required</span>
                )}
              </label>

              <label>
                Payment Method:
                <input
                  type="text"
                  {...register("payment_method", { required: true })}
                  placeholder="Enter payment method"
                />
                {errors.payment_method && (
                  <span className="error">Payment method is required</span>
                )}
              </label>

              <label>
                Phone Number:
                <input
                  type="text"
                  {...register("phone_number", { required: true })}
                  placeholder="Enter phone number"
                />
                {errors.phone_number && (
                  <span className="error">Phone number is required</span>
                )}
              </label>

              <label>
                Status:
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
                  <span className="error">Status is required</span>
                )}
              </label>
            </div>

            <div className="form-actions">
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
