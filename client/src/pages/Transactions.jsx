// pages/Transactions.jsx
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../assets/styles/transactions.css";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import TransactionSidebar from "../components/Transactions/TransactionSidebar/TransactionSidebar";
import RevenueManagement from "../components/Transactions/RevenueManagement";
import ExpensesManagement from "../components/Transactions/ExpensesManagement";

const Transactions = () => {
  const [showRevenue, setShowRevenue] = useState(true);

  useEffect(() => {
    const storedView = localStorage.getItem("transactionsView");
    if (storedView) {
      setShowRevenue(storedView === "revenue");
    }
  }, []);

  const toggleView = (view) => {
    setShowRevenue(view === "revenue");
    localStorage.setItem("transactionsView", view);
  };

  return (
    <>
      <Helmet>
        <title>Transactions - Dakoke Springs</title>
      </Helmet>
      <Navbar />
      <div className="main-container">
        <TransactionSidebar
          toggleView={toggleView}
          currentView={showRevenue ? "revenue" : "expenses"}
        />
        <div className="transactions-content">
          {showRevenue ? <RevenueManagement /> : <ExpensesManagement />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Transactions;
