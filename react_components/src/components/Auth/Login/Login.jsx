import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log("Logging in with", data);
    // Handle login logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="login-form-group">
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>
          <div className="login-form-group">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              <span className="material-symbols-rounded">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="login-footer">
            <a href="/home">Go Back Home</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
