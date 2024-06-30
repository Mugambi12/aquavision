import React from "react";
import { useForm } from "react-hook-form";
import "./AddUserForm.css";

const AddUserForm = ({ onSubmit, houseSections, isProcessing }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      role: "basic", // Set default role
    },
  });

  const onSubmitForm = (data) => {
    const newUser = {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      houseSection: data.houseSection,
      houseNumber: data.houseNumber,
      isAdmin: data.role === "admin",
      isBasic: data.role === "basic",
    };
    onSubmit(newUser);
  };

  return (
    <div className="add-user-container">
      <h2 className="modal-title">Add New User</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="add-user-form">
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
          <label>Role:</label>
          <div className="role-options">
            <div>
              <input
                type="radio"
                id="adminRole"
                value="admin"
                {...register("role", { required: "Role is required" })}
              />
              <label htmlFor="adminRole">Admin</label>
            </div>
            <div>
              <input
                type="radio"
                id="basicRole"
                value="basic"
                {...register("role", { required: "Role is required" })}
              />
              <label htmlFor="basicRole">Basic</label>
            </div>
          </div>
          {errors.role && (
            <p className="error-message">{errors.role.message}</p>
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
            <option value="" disabled>
              Select house section
            </option>
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

        <button type="submit" className="submit-button">
          {isProcessing ? "Adding User..." : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
