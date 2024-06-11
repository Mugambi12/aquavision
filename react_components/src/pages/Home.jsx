import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import Spinner from "../components/Spinner/Spinner";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - Dakoke Springs</title>
      </Helmet>
      <Navbar />
      <div className="main-container">
        <div>Home</div>
      </div>
    </>
  );
};

export default Home;
