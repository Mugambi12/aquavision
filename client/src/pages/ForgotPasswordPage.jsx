// ForgotPasswordPage.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";
import "../components/Auth/ForgotPasswordForm.css";
import { postForgotPassword } from "../resources/apiLogin";

const ForgotPasswordPage = () => {
  const callApiAndResetPassword = async (email) => {
    try {
      await postForgotPassword(email);

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert(data.message);
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error resetting password:", error);
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
