import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/navbar/Navbar";
import Spinner from "../components/spinner/Spinner";

import { fetchActiveHouses } from "../apis/ApiDashboard";

const Dashboard = () => {
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

export default Dashboard;
