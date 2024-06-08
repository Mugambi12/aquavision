import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "../assets/styles/auth.css";
import availableHouseSections from "../db/auth";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleRegister = (data) => {
    console.log("Registering with", data);
    // Handle registration logic here
  };

  return (
    <>
      <Helmet>
        <title>Auth - Dakoke Springs</title>
      </Helmet>
      <div className="auth-container">
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
            <Register
              availableHouseSections={availableHouseSections}
              handleRegister={handleRegister}
            />
            <p>
              Already have an account?{" "}
              <button className="toggle-auth-page" onClick={toggleAuthMode}>
                Login here
              </button>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Auth;
