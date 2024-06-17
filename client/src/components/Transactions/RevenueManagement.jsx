// components/Transactions/RevenueManagement.jsx
import React, { useEffect, useState } from "react";
import RevenueDashboard from "./RevenueDashboard/RevenueDashboard";
import DeleteRevenue from "./DeleteRevenue/DeleteRevenue";
import EditRevenue from "./EditRevenue/EditRevenue";
import RefundRevenue from "./RefundRevenue/RefundRevenue";
import AddRevenue from "./AddRevenue/AddRevenue";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import Spinner from "../Spinner/Spinner";
import {
  fetchRevenue,
  postRevenue,
  deleteRevenue,
  updateRevenue,
  refundRevenue,
} from "../../services/apiRevenue";

const RevenueManagement = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [selectedRevenue, setSelectedRevenue] = useState(null);
  const [isEditRevenueModalOpen, setIsEditModalOpen] = useState(false);
  const [isRefundRevenueModalOpen, setIsRefundModalOpen] = useState(false);
  const [isAddRevenueModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteRevenueModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    callApiAndGetRevenue();
  }, []);

  const callApiAndGetRevenue = async () => {
    try {
      setLoading(true);
      const data = await fetchRevenue();
      setRevenueData(data);
    } catch (error) {
      console.error("Error fetching Revenue:", error);
    } finally {
      setLoading(false);
    }
  };

  const callApiAndPostRevenue = async (newRevenue) => {
    try {
      await postRevenue(newRevenue);
      console.log("Revenue added successfully.");
      callApiAndGetRevenue();
    } catch (error) {
      console.error("Error adding invoice:", error);
    } finally {
      setIsCreateModalOpen(false);
    }
  };

  const callApiAndUpdateRevenue = async (editedRevenue) => {
    try {
      await updateRevenue(editedRevenue);
      console.log("Revenue updated successfully.");
      callApiAndGetRevenue();
    } catch (error) {
      console.error("Error updating revenue:", error);
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const callApiAndRefundRevenue = async () => {
    try {
      await refundRevenue(selectedRevenue._id);
      console.log("Revenue refunded successfully.");
      callApiAndGetRevenue();
    } catch (error) {
      console.error("Error refunding revenue:", error);
    } finally {
      setIsRefundModalOpen(false);
    }
  };

  const callApiAndDeleteRevenue = async () => {
    try {
      await deleteRevenue(selectedRevenue._id);
      console.log("Revenue deleted successfully.");
      callApiAndGetRevenue();
    } catch (error) {
      console.error("Error deleting revenue:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const openAddRevenueModal = () => {
    setIsCreateModalOpen(true);
  };

  const openEditRevenueModal = (revenue) => {
    setSelectedRevenue(revenue);
    setIsEditModalOpen(true);
  };

  const openRefundRevenueModal = (revenue) => {
    setSelectedRevenue(revenue);
    setIsRefundModalOpen(true);
  };

  const openDeleteRevenueModal = (revenue) => {
    setSelectedRevenue(revenue);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <RevenueDashboard
          revenue={revenueData}
          openDeleteRevenueModal={openDeleteRevenueModal}
          openEditRevenueModal={openEditRevenueModal}
          openRefundRevenueModal={openRefundRevenueModal}
          openAddRevenueModal={openAddRevenueModal}
        />
      )}

      <ModalWrapper
        isOpen={isDeleteRevenueModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
      >
        <DeleteRevenue
          revenue={selectedRevenue}
          onSubmit={callApiAndDeleteRevenue}
        />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isEditRevenueModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <EditRevenue
          revenue={selectedRevenue}
          onSubmit={callApiAndUpdateRevenue}
        />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isRefundRevenueModalOpen}
        onRequestClose={() => setIsRefundModalOpen(false)}
      >
        <RefundRevenue
          revenue={selectedRevenue}
          onSubmit={callApiAndRefundRevenue}
        />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isAddRevenueModalOpen}
        onRequestClose={() => setIsCreateModalOpen(false)}
      >
        <AddRevenue onSubmit={callApiAndPostRevenue} />
      </ModalWrapper>
    </>
  );
};

export default RevenueManagement;
