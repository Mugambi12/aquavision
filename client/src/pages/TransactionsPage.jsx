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
import { fetchHighestExpenses } from "../resources/apiExpenses";

const Transactions = () => {
  const [loading, setLoading] = useState(false);
  const [highestExpenses, setHighestExpenses] = useState([]);
  const [showRevenue, setShowRevenue] = useState(true);
  const [unpaidInvoiceData, setUnpaidInvoiceData] = useState([]);
  const [isCreateRevenueModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateExpenseModalOpen, setIsCreateExpenseModalOpen] =
    useState(false);

  useEffect(() => {
    callApiAndGetUnpaidInvoice();
    callApiAndGetHighestExpenses();
  }, []);

  const callApiAndGetUnpaidInvoice = async () => {
    try {
      setLoading(true);
      const data = await fetchUnpaidInvoice();
      console.log("Fetched unpaid invoices successfully.");
      setUnpaidInvoiceData(data);
    } catch (error) {
      console.error("Error fetching Unpaid Invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  const callApiAndGetHighestExpenses = async () => {
    try {
      setLoading(true);
      const data = await fetchHighestExpenses();
      console.log("Fetched highest expenses successfully.");
      setHighestExpenses(data);
    } catch (error) {
      console.error("Error fetching highest expenses:", error);
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
    //setTimeout(() => {
    setShowRevenue(view === "revenue");
    localStorage.setItem("transactionsView", view);
    setLoading(false);
    //}, 1000);
  };

  const openCreateRevenueModal = () => {
    setIsCreateModalOpen(true);
  };

  const openCreateExpenseModal = () => {
    setIsCreateExpenseModalOpen(true);
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
              unpaidInvoice={unpaidInvoiceData}
              highestExpenses={highestExpenses}
              openCreateRevenueModal={openCreateRevenueModal}
              openCreateExpenseModal={openCreateExpenseModal}
              toggleView={toggleView}
              currentView={showRevenue ? "revenue" : "expenses"}
            />
            <div className="transactions-content">
              {showRevenue ? (
                <RevenueManagement
                  openCreateRevenueModal={openCreateRevenueModal}
                  isCreateRevenueModalOpen={isCreateRevenueModalOpen}
                  setIsCreateModalOpen={setIsCreateModalOpen}
                />
              ) : (
                <ExpensesManagement
                  openCreateExpenseModal={openCreateExpenseModal}
                  isCreateExpenseModalOpen={isCreateExpenseModalOpen}
                  setIsCreateExpenseModalOpen={setIsCreateExpenseModalOpen}
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
