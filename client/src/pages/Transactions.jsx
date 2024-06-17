// pages/Transactions.jsx
import "../assets/styles/transactions.css";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import TransactionSidebar from "../components/Transactions/TransactionSidebar/TransactionSidebar";
import RevenueManagement from "../components/Transactions/RevenueManagement";
import ExpensesManagement from "../components/Transactions/ExpensesManagement";
import { fetchUnpaidInvoice } from "../services/apiRevenue";

const Transactions = () => {
  const [showRevenue, setShowRevenue] = useState(true);
  const [unpaidInvoiceData, setUnpaidInvoiceData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    callApiAndGetUnpaidInvoice();
  }, []);

  const callApiAndGetUnpaidInvoice = async () => {
    try {
      setLoading(true);
      const data = await fetchUnpaidInvoice();
      console.log("Unpaid Invoice Data:", data);
      setUnpaidInvoiceData(data);
    } catch (error) {
      console.error("Error fetching Unpaid Invoice:", error);
    } finally {
      setLoading(false);
    }
  };

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
          unpaidInvoice={unpaidInvoiceData}
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
