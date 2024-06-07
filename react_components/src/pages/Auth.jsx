import React, { useState } from "react";
import "../assets/styles/auth.css";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import LoginForm from "../components/Auth/Login";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <LoginForm />
      {/*
      {isLogin ? (
        <>
          <Login />
          <p>
            Don't have an account?{" "}
            <button className="toggle-auth-page" onClick={toggleAuthMode}>
              Register here
            </button>
          </p>
        </>
      ) : (
        <>
          <Register />
          <p>
            Already have an account?{" "}
            <button className="toggle-auth-page" onClick={toggleAuthMode}>
              Login here
            </button>
          </p>
        </>
          )}
          */}
    </>
  );
};

export default Auth;
