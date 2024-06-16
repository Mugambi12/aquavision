import React, { useEffect, useState } from "react";
import RevenueDashboard from "./RevenueDashboard/RevenueDashboard";
import DeleteRevenue from "./DeleteRevenue/DeleteRevenue";
import EditRevenue from "./EditRevenue/EditRevenue";
import RefundRevenue from "./RefundRevenue/RefundRevenue";
import AddRevenue from "./AddRevenue/AddRevenue";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import {
  fetchRevenue,
  postRevenue,
  deleteRevenue,
} from "../../services/apiRevenue";
import Spinner from "../Spinner/Spinner";

const RevenueManagement = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [selectedRevenue, setSelectedRevenue] = useState(null);
  const [isDeleteRevenueModalOpen, setIsDeleteRevenueModalOpen] =
    useState(false);
  const [isEditRevenueModalOpen, setIsEditRevenueModalOpen] = useState(false);
  const [isRefundRevenueModalOpen, setIsRefundRevenueModalOpen] =
    useState(false);
  const [isAddRevenueModalOpen, setIsAddRevenueModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callApiAndGetRevenue();
  }, []);

  const callApiAndGetRevenue = async () => {
    try {
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
      setIsAddRevenueModalOpen(false);
      callApiAndGetRevenue();
    } catch (error) {
      console.error("Error adding revenue:", error);
    }
  };

  const callApiAndDeleteRevenue = async (revenueId) => {
    try {
      await deleteRevenue(revenueId);
      console.log("Revenue deleted successfully.");
      setIsDeleteRevenueModalOpen(false);
      callApiAndGetRevenue();
    } catch (error) {
      console.error("Error deleting revenue:", error);
    }
  };

  const openAddModal = () => {
    setIsAddRevenueModalOpen(true);
  };

  const openRefundModal = (revenue) => {
    setSelectedRevenue(revenue);
    setIsRefundRevenueModalOpen(true);
  };

  const openEditModal = (revenue) => {
    setSelectedRevenue(revenue);
    setIsEditRevenueModalOpen(true);
  };

  const openDeleteModal = (revenue) => {
    setSelectedRevenue(revenue);
    setIsDeleteRevenueModalOpen(true);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <RevenueDashboard
            data={revenueData}
            openDeleteModal={openDeleteModal}
            openEditModal={openEditModal}
            openRefundModal={openRefundModal}
            openAddModal={openAddModal}
          />
          <ModalWrapper
            isOpen={isAddRevenueModalOpen}
            onRequestClose={() => setIsAddRevenueModalOpen(false)}
          >
            <AddRevenue onSubmit={callApiAndPostRevenue} />
          </ModalWrapper>
          <ModalWrapper
            isOpen={isEditRevenueModalOpen}
            onRequestClose={() => setIsEditRevenueModalOpen(false)}
          >
            <EditRevenue revenue={selectedRevenue} />
          </ModalWrapper>
          <ModalWrapper
            isOpen={isDeleteRevenueModalOpen}
            onRequestClose={() => setIsDeleteRevenueModalOpen(false)}
          >
            <DeleteRevenue
              revenue={selectedRevenue}
              onSubmit={() => callApiAndDeleteRevenue(selectedRevenue._id)}
            />
          </ModalWrapper>
          <ModalWrapper
            isOpen={isRefundRevenueModalOpen}
            onRequestClose={() => setIsRefundRevenueModalOpen(false)}
          >
            <RefundRevenue revenue={selectedRevenue} />
          </ModalWrapper>
        </>
      )}
    </>
  );
};

export default RevenueManagement;
