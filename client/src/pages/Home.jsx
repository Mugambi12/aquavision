import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import Spinner from "../components/Spinner/Spinner";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log('user data:', data);
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - Dakoke Springs</title>
      </Helmet>
      <Navbar />
      <div className="main-container">
        <h1>Users</h1>
        {loading ? (
          <Spinner /> // Display a spinner or loading indicator while fetching data
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.full_name}</li> // Adjust this based on your actual user data structure
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Home;
