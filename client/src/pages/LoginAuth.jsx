import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "../assets/styles/LoginAuth.css";

const LoginAuth = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>Login - Dakoke Springs Silas</title>
      </Helmet>
      <div className="login-content">
        <div className="image-container">
          <img
            src="https://media.istockphoto.com/id/1368151370/photo/user-typing-login-and-password-cyber-security-concept.jpg?s=1024x1024&w=is&k=20&c=DDQn_dYm4qaOcMBuelgjfGM6xjvHZdHQ_Y08BhvsqaU="
            alt="Login Background"
            className="background-image"
          />
        </div>
        <div className="login-form">
          <h1>Login</h1>
          {/* Login Form */}
          <form>
            <label htmlFor="phone_number">
              <span className="material-symbols-rounded label-icon">phone</span>
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              placeholder="Enter phone number"
              required
            />

            <label htmlFor="password">
              <span className="material-symbols-rounded label-icon">lock</span>
              Password:
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
                required
              />
              <span
                className="material-symbols-rounded password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </div>

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAuth;
