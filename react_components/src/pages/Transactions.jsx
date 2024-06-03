import { useState, useEffect } from "react";
import "../assets/styles/transactions.css";
import Expenses from "../components/Transactions/Expenses/Expenses";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Transactions/Sidebar/Sidebar";
import Revenue from "../components/Transactions/Revenue/Revenue";

const Transactions = () => {
  const [showRevenue, setShowRevenue] = useState(true);

  useEffect(() => {
    // Retrieve the initial view from localStorage
    const storedView = localStorage.getItem("transactionsView");
    if (storedView) {
      setShowRevenue(storedView === "revenue");
    }
  }, []);

  const toggleView = (view) => {
    setShowRevenue(view === "revenue");
    // Save the selected view to localStorage
    localStorage.setItem("transactionsView", view);
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar
          toggleView={toggleView}
          currentView={showRevenue ? "revenue" : "expenses"}
        />
        <div className="transactions-content">
          {showRevenue ? <Revenue /> : <Expenses />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Transactions;
