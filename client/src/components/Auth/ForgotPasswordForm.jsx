// ForgotPasswordForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import "./ForgotPasswordForm.css";

const ForgotPasswordForm = ({ callApiAndResetPassword }) => {
  // Receive callApiAndResetPassword as prop
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    callApiAndResetPassword(data.email); // Call the API function with email data
  };

  return (
    <div className="forgot-password-form">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
