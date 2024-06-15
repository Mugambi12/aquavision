// components/Transactions/RevenueManagement.jsx
import React, { useState } from "react";
import revenueData from "../../db/revenue";
import RevenueDashboard from "./RevenueDashboard/RevenueDashboard";
import DeleteRevenue from "./DeleteRevenue/DeleteRevenue";
import EditRevenue from "./EditRevenue/EditRevenue";
import RefundRevenue from "./RefundRevenue/RefundRevenue";
import AddRevenue from "./AddRevenue/AddRevenue";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

const RevenueManagement = () => {
  const [selectedRevenue, setSelectedRevenue] = useState(null);
  const [isDeleteRevenueModalOpen, setIsDeleteRevenueModalOpen] =
    useState(false);
  const [isEditRevenueModalOpen, setIsEditRevenueModalOpen] = useState(false);
  const [isRefundRevenueModalOpen, setIsRefundRevenueModalOpen] =
    useState(false);
  const [isAddRevenueModalOpen, setIsAddRevenueModalOpen] = useState(false);

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

  const handleDeleteRevenue = async () => {
    console.log("Deleting revenue:", selectedRevenue);
    console.log("Revenue deleted successfully.");
    setIsDeleteRevenueModalOpen(false);
  };

  const handleEditRevenue = (editedRevenue) => {
    console.log("Editing revenue:", editedRevenue);
    console.log("Revenue updated successfully.");
    setIsEditRevenueModalOpen(false);
  };

  const handleRefundRevenue = () => {
    console.log("Refunding revenue:", selectedRevenue);
    console.log("Revenue refunded successfully.");
    setIsRefundRevenueModalOpen(false);
  };

  const handleAddRevenue = (newRevenue) => {
    console.log("Adding revenue:", newRevenue);
    console.log("Revenue added successfully.");
    setIsAddRevenueModalOpen(false);
  };

  return (
    <>
      <RevenueDashboard
        revenue={revenueData}
        openDeleteRevenueModal={openDeleteRevenueModal}
        openEditRevenueModal={openEditRevenueModal}
        openRefundRevenueModal={openRefundRevenueModal}
        openAddRevenueModal={openAddRevenueModal}
      />

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
    </>
  );
};

export default RevenueManagement;
