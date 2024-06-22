// ForgotPasswordPage.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";
import "../components/Auth/ForgotPasswordForm.css";
import { postForgotPassword } from "../resources/apiLogin";

const ForgotPasswordPage = () => {
  const callApiAndResetPassword = async (email) => {
    try {
      const response = await postForgotPassword(email);
      console.log(response); // Log the response from the API
      alert(response.message); // Show the message from the response
      window.location.href = "/login";
    } catch (error) {
      console.error("Error resetting password:", error);
      // Handle any errors that occur during the API call
      // For example, you can display an error message to the user
    }
  };

  return (
    <div className="forgot-password-container">
      <Helmet>
        <title>Forgot Password - Dakoke Springs</title>
      </Helmet>
      <ForgotPasswordForm callApiAndResetPassword={callApiAndResetPassword} />{" "}
      {/* Pass the API call function as prop */}
    </div>
  );
};

export default ForgotPasswordPage;
