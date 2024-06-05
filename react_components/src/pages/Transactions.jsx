// Transactions.js
import { useState, useEffect } from "react";
import "../assets/styles/transactions.css";
import revenueData from "../db/revenue";
import Expenses from "../components/Transactions/Expenses/Expenses";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Transactions/Sidebar/Sidebar";
import Revenue from "../components/Transactions/Revenue/Revenue";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";
import DeleteRevenue from "../components/Transactions/Revenue/DeleteRevenue/DeleteRevenue";
import EditRevenue from "../components/Transactions/Revenue/EditRevenue/EditRevenue";
import RefundRevenue from "../components/Transactions/Revenue/RefundRevenue/RefundRevenue";

const Transactions = () => {
  const [showRevenue, setShowRevenue] = useState(true);
  const [selectedRevenue, setSelectedRevenue] = useState(null);
  const [isDeleteRevenueModalOpen, setIsDeleteRevenueModalOpen] =
    useState(false);
  const [isEditRevenueModalOpen, setIsEditRevenueModalOpen] = useState(false);
  const [isRefundRevenueModalOpen, setIsRefundRevenueModalOpen] =
    useState(false);

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

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar
          toggleView={toggleView}
          currentView={showRevenue ? "revenue" : "expenses"}
        />
        <div className="transactions-content">
          {showRevenue ? (
            <Revenue
              revenue={revenueData}
              openDeleteRevenueModal={openDeleteRevenueModal}
              openEditRevenueModal={openEditRevenueModal}
              openRefundRevenueModal={openRefundRevenueModal}
            />
          ) : (
            <Expenses />
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
    </>
  );
};

export default Transactions;
