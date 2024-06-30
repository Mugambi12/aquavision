import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./EditUserForm.css";

const EditUserForm = ({ onSubmit, userData, houseSections, isProcessing }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userData) {
      setValue("id", userData.id || "");
      setValue("fullName", userData.fullName || "");
      setValue("email", userData.email || "");
      setValue("phoneNumber", userData.phoneNumber || "");
      setValue("houseSection", userData.houseSection || "");
      setValue("houseNumber", userData.houseNumber || "");
      setValue("isAdmin", userData.isAdmin || false);
      setValue("isActive", userData.isActive || false);
    }
  }, [userData, setValue]);

  // Set defaultChecked based on userData.isAdmin
  useEffect(() => {
    if (userData) {
      setValue("role", userData.isAdmin ? "admin" : "basic");
    }
  }, [userData, setValue]);

  const onSubmitForm = (data) => {
    const updatedUser = {
      ...data,
      id: data.id || null,
      isAdmin: data.role === "admin", // Set isAdmin based on role selection
      isActive: data.isActive || false,
    };
    onSubmit(updatedUser);
  };

  return (
    <div className="edit-user-container">
      <h2 className="modal-title">Update User Info</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="edit-user-form">
        <input type="hidden" {...register("id")} required disabled />

        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            {...register("fullName", { required: "Full Name is required" })}
          />
          {errors.fullName && (
            <p className="error-message">{errors.fullName.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="Enter phone number"
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
          />
          {errors.phoneNumber && (
            <p className="error-message">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="houseSection">House Section:</label>
          <select
            id="houseSection"
            {...register("houseSection", {
              required: "House Section is required",
            })}
          >
            {houseSections.services.house_sections.map((section) => (
              <option key={section._id} value={section.section}>
                {section.section}
              </option>
            ))}
          </select>
          {errors.houseSection && (
            <p className="error-message">{errors.houseSection.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="houseNumber">House Number:</label>
          <input
            type="text"
            id="houseNumber"
            placeholder="Enter house number"
            {...register("houseNumber", {
              required: "House Number is required",
            })}
          />
          {errors.houseNumber && (
            <p className="error-message">{errors.houseNumber.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Role:</label>
          <div className="role-options">
            <div>
              <input
                type="radio"
                id="adminRole"
                value="admin"
                {...register("role", { required: "Role is required" })}
                defaultChecked={watch("role") === "admin"}
              />
              <label htmlFor="adminRole">Admin</label>
            </div>
            <div>
              <input
                type="radio"
                id="basicRole"
                value="basic"
                {...register("role", { required: "Role is required" })}
                defaultChecked={watch("role") === "basic"}
              />
              <label htmlFor="basicRole">Basic</label>
            </div>
          </div>
          {errors.role && (
            <p className="error-message">{errors.role.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Active:</label>
          <label className="toggle-switch">
            <input type="checkbox" {...register("isActive")} />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <button type="submit" className="submit-button">
          {isProcessing ? "Updating User..." : "Update User"}
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
