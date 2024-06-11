// Transactions.js
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../assets/styles/transactions.css";
import revenueData from "../db/revenue";
import expensesData from "../db/expenses";
import Expenses from "../components/Transactions/Expenses/Expenses";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Transactions/Sidebar/Sidebar";
import Revenue from "../components/Transactions/Revenue/Revenue";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";
import DeleteRevenue from "../components/Transactions/Revenue/DeleteRevenue/DeleteRevenue";
import EditRevenue from "../components/Transactions/Revenue/EditRevenue/EditRevenue";
import RefundRevenue from "../components/Transactions/Revenue/RefundRevenue/RefundRevenue";
import AddRevenue from "../components/Transactions/Revenue/AddRevenue/AddRevenue";
import AddExpense from "../components/Transactions/Expenses/AddExpense/AddExpense";

const Transactions = () => {
  const [showRevenue, setShowRevenue] = useState(true);
  const [selectedRevenue, setSelectedRevenue] = useState(null);
  const [isDeleteRevenueModalOpen, setIsDeleteRevenueModalOpen] =
    useState(false);
  const [isEditRevenueModalOpen, setIsEditRevenueModalOpen] = useState(false);
  const [isRefundRevenueModalOpen, setIsRefundRevenueModalOpen] =
    useState(false);
  const [isAddRevenueModalOpen, setIsAddRevenueModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

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

  const openDeleteRevenueModal = (revenue) => {
    setSelectedRevenue(revenue);
    setIsDeleteRevenueModalOpen(true);
  };

  const openEditRevenueModal = (revenue) => {
    setSelectedRevenue(revenue);
    setIsEditRevenueModalOpen(true);
  };

  const openRefundRevenueModal = (revenue) => {
    setSelectedRevenue(revenue);
    setIsRefundRevenueModalOpen(true);
  };

  const openAddRevenueModal = () => {
    setIsAddRevenueModalOpen(true);
  };

  const openAddExpenseModal = () => {
    setIsAddExpenseModalOpen(true);
  };

  const handleDeleteRevenue = async () => {
    console.log("Deleting revenue:", selectedRevenue);
    // Implement logic to delete the revenue data
    console.log("Revenue deleted successfully.");
    setIsDeleteRevenueModalOpen(false);
  };

  const handleEditRevenue = (editedRevenue) => {
    console.log("Editing revenue:", editedRevenue);
    // Implement logic to update the revenue data
    console.log("Revenue updated successfully.");
    setIsEditRevenueModalOpen(false);
  };

  const handleRefundRevenue = () => {
    console.log("Refunding revenue:", selectedRevenue);
    // Implement logic to refund the revenue
    console.log("Revenue refunded successfully.");
    setIsRefundRevenueModalOpen(false);
  };

  const handleAddRevenue = (newRevenue) => {
    console.log("Adding revenue:", newRevenue);
    // Implement logic to add the revenue data
    console.log("Revenue added successfully.");
    setIsAddRevenueModalOpen(false);
  };

  const handleAddExpense = (newExpense) => {
    console.log("Adding expense:", newExpense);
    // Implement logic to add the revenue data
    console.log("Expense added successfully.");
    setIsAddExpenseModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Transactions - Dakoke Springs</title>
      </Helmet>
      <Navbar />
      <div className="main-container">
        <Sidebar
          toggleView={toggleView}
          currentView={showRevenue ? "revenue" : "expenses"}
          openAddRevenueModal={openAddRevenueModal}
          openAddExpenseModal={openAddExpenseModal}
        />
        <div className="transactions-content">
          {showRevenue ? (
            <Revenue
              revenue={revenueData}
              openDeleteRevenueModal={openDeleteRevenueModal}
              openEditRevenueModal={openEditRevenueModal}
              openRefundRevenueModal={openRefundRevenueModal}
              openAddRevenueModal={openAddRevenueModal}
            />
          ) : (
            <Expenses
              expenses={expensesData}
              openAddExpenseModal={openAddExpenseModal}
            />
          )}
        </div>
      </div>
      <Footer />

      <ModalWrapper
        isOpen={isDeleteRevenueModalOpen}
        onRequestClose={() => setIsDeleteRevenueModalOpen(false)}
      >
        <DeleteRevenue
          revenue={selectedRevenue}
          onSubmit={handleDeleteRevenue}
        />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isEditRevenueModalOpen}
        onRequestClose={() => setIsEditRevenueModalOpen(false)}
      >
        <EditRevenue revenue={selectedRevenue} onSubmit={handleEditRevenue} />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isRefundRevenueModalOpen}
        onRequestClose={() => setIsRefundRevenueModalOpen(false)}
      >
        <RefundRevenue
          revenue={selectedRevenue}
          onSubmit={handleRefundRevenue}
        />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isAddRevenueModalOpen}
        onRequestClose={() => setIsAddRevenueModalOpen(false)}
      >
        <AddRevenue onSubmit={handleAddRevenue} />
      </ModalWrapper>

      {/*<ModalWrapper
        isOpen={isDeleteExpensesModalOpen}
        onRequestClose={() => setIsDeleteExpensesModalOpen(false)}
      >
        <DeleteExpense
          expense={selectedExpense}
          onSubmit={handleDeleteExpenses}
        />
      </ModalWrapper>*/}

      <ModalWrapper
        isOpen={isAddExpenseModalOpen}
        onRequestClose={() => setIsAddExpenseModalOpen(false)}
      >
        <AddExpense onSubmit={handleAddExpense} />
      </ModalWrapper>
    </>
  );
};

export default Transactions;
