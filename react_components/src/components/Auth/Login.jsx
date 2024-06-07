import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import waveImg from "../../assets/images/wave.png";
import bgImg from "../../assets/images/bg.svg";
import avatarImg from "../../assets/images/avatar.svg";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="auth-container">
      <img className="auth-wave" src={waveImg} alt="wave" />
      <div className="auth-img">
        <img src={bgImg} alt="background" />
      </div>
      <div className="auth-login-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <img src={avatarImg} alt="avatar" />
          <h2 className="title">Welcome</h2>
          <div className={`auth-input-div ${errors.username ? "error" : ""}`}>
            <div className="auth-i">
              <span className="material-symbols-rounded">person</span>
            </div>
            <div className="div">
              <h5>Username</h5>
              <input
                type="text"
                className="input"
                {...register("username", { required: true })}
              />
            </div>
          </div>
          <div className={`auth-input-div ${errors.password ? "error" : ""}`}>
            <div className="auth-i">
              <span className="material-symbols-rounded">lock</span>
            </div>
            <div className="div">
              <h5>Password</h5>
              <input
                type="password"
                className="input"
                {...register("password", { required: true })}
              />
            </div>
          </div>
          <a href="#">Forgot Password?</a>
          <input type="submit" className="auth-btn" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
