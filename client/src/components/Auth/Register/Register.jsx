import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import "./Register.css";

const Register = ({ availableHouseSections, handleRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const houseSection = watch("houseSection", "");

  const filteredHouseSections = useMemo(() => {
    if (!houseSection) return availableHouseSections;
    return availableHouseSections.filter((section) =>
      section.toLowerCase().includes(houseSection.toLowerCase())
    );
  }, [houseSection]);

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="register-form-group">
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>
          <div className="register-form-group">
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              placeholder="Phone Number"
            />
            {errors.phone && (
              <span className="error-message">{errors.phone.message}</span>
            )}
          </div>
          <div className="register-form-group">
            <input
              type="text"
              {...register("houseSection", {
                required: "House section is required",
              })}
              placeholder="House Section"
              list="houseSections"
            />
            <datalist id="houseSections">
              {filteredHouseSections.map((section) => (
                <option key={section} value={section} />
              ))}
            </datalist>
            {errors.houseSection && (
              <span className="error-message">
                {errors.houseSection.message}
              </span>
            )}
          </div>
          <div className="register-form-group">
            <input
              type="text"
              {...register("houseNumber", {
                required: "House number is required",
              })}
              placeholder="House Number"
            />
            {errors.houseNumber && (
              <span className="error-message">
                {errors.houseNumber.message}
              </span>
            )}
          </div>
          <div className="register-form-group">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
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
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
