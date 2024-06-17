// pages/Transactions.jsx
import "../assets/styles/transactions.css";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import TransactionSidebar from "../components/Transactions/TransactionSidebar/TransactionSidebar";
import RevenueManagement from "../components/Transactions/RevenueManagement";
import ExpensesManagement from "../components/Transactions/ExpensesManagement";
import Spinner from "../components/Spinner/Spinner";
import { fetchUnpaidInvoice } from "../resources/apiRevenue";

const Transactions = () => {
  const [showRevenue, setShowRevenue] = useState(true);
  const [unpaidInvoiceData, setUnpaidInvoiceData] = useState([]);
  const [isAddRevenueModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
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
    setLoading(true);
    setTimeout(() => {
      setShowRevenue(view === "revenue");
      localStorage.setItem("transactionsView", view);
      setLoading(false);
    }, 500); // Adjust delay as needed
  };

  const openAddRevenueModal = () => {
    setIsCreateModalOpen(true);
  };

  const openAddExpenseModal = () => {
    setIsAddExpenseModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Transactions - Dakoke Springs</title>
      </Helmet>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="main-container">
            <TransactionSidebar
              openAddRevenueModal={openAddRevenueModal}
              unpaidInvoice={unpaidInvoiceData}
              toggleView={toggleView}
              currentView={showRevenue ? "revenue" : "expenses"}
            />
            <div className="transactions-content">
              {showRevenue ? (
                <RevenueManagement
                  openAddRevenueModal={openAddRevenueModal}
                  isAddRevenueModalOpen={isAddRevenueModalOpen}
                  setIsCreateModalOpen={setIsCreateModalOpen}
                />
              ) : (
                <ExpensesManagement
                  openAddExpenseModal={openAddExpenseModal}
                  isAddExpenseModalOpen={isAddExpenseModalOpen}
                  setIsAddExpenseModalOpen={setIsAddExpenseModalOpen}
                />
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Transactions;
