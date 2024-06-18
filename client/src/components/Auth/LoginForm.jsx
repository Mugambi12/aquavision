import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    console.log(data);
    // Handle login logic here
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="phone_number">
          <span className="material-symbols-rounded label-icon">phone</span>
          Phone Number:
        </label>
        <input
          type="tel"
          id="phone_number"
          placeholder="Enter phone number"
          {...register("phone_number", {
            required: "Phone number is required",
          })}
        />
        {errors.phone_number && (
          <p className="error">{errors.phone_number.message}</p>
        )}

        <label htmlFor="password">
          <span className="material-symbols-rounded label-icon">lock</span>
          Password:
        </label>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter password"
            {...register("password", { required: "Password is required" })}
          />
          <span
            className="material-symbols-rounded password-toggle"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "visibility_off" : "visibility"}
          </span>
        </div>
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit">Login</button>
      </form>
      <p>
        <Link to="/forgot-password">Back to Login</Link>
      </p>
    </div>
  );
};

export default LoginForm;
