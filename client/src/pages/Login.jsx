import React from "react";
import { Helmet } from "react-helmet-async";
import LoginForm from "../components/Auth/LoginForm";
import loginImg from "../assets/images/static/login-page-image.jpg";
import "../components/Auth/LoginForm.css";

const LoginPage = () => {
  return (
    <div className="login-container">
      <Helmet>
        <title>Login - Dakoke Springs</title>
      </Helmet>
      <div className="login-content">
        <div className="image-container">
          <img
            src={loginImg}
            alt="Login Background"
            className="background-image"
          />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
