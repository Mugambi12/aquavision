import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./ForgotPasswordForm.css";

const ForgotPasswordForm = ({ callApiAndResetPassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    callApiAndResetPassword(data.email);
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
      <p>
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
