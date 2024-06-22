import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import Spinner from "../components/Spinner/Spinner";

import { fetchActiveHouses } from "../resources/apiHome";

const Home = () => {
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchActiveHouses();
      setHomeData(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Home - Dakoke Springs</title>
      </Helmet>
      <Navbar />
      <div className="main-container">
        <h1>General Dashboard</h1>
        {loading ? (
          <Spinner />
        ) : (
          <ul>
            {homeData.map((item) => (
              <li key={item._id}>{user.house_section}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Home;
