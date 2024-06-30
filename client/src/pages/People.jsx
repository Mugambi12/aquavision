import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import ModalWrapper from "../components/modalWrapper/ModalWrapper";
import PeopleManagement from "../components/people/PeopleManagement";
import PeopleSidebar from "../components/people/PeopleSidenav/PeopleSidenav";
import AddUserForm from "../components/people/peopleForms/AddUserForm";
import EditUserForm from "../components/people/peopleForms/EditUserForm";
import Spinner from "../components/spinner/Spinner";

import {
  fetchPeople,
  fetchHouseSections,
  createNewUser,
  updateUser,
} from "../apis/ApiPeople";
import { set } from "react-hook-form";

const People = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [peopleData, setPeopleData] = useState([]);
  const [houseSections, setHouseSections] = useState([]);
  const [editUserData, setEditUserData] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    callApiAndFetchPeople();
    callApiAndFetchHouseSections();
  }, []);

  const callApiAndFetchPeople = async () => {
    try {
      setIsLoading(true);
      const data = await fetchPeople();

      const mappedData = data.map((person) => ({
        id: person._id,
        fullName: person.full_name,
        email: person.email,
        phoneNumber: person.phone_number,
        houseSection: person.house_section,
        houseNumber: person.house_number,
        profileImage: person.profile_image,
        isActive: person.is_active,
        isAdmin: person.is_admin,
        balance: person.balance,
        lastLogin: person.last_login,
        lastLogout: person.last_logout,
        createdAt: person.created_at,
        updatedAt: person.updated_at,
        deletedAt: person.deleted_at,
        invoices: person.invoices,
        revenues: person.revenues,
        expenses: person.expenses,
        totalWaterConsumption: person.total_water_consumption,
        totalInvoiceAmount: person.total_invoice_amount,
        totalRevenueAmount: person.total_revenue_amount,
        totalExpenseAmount: person.total_expense_amount,
      }));

      setPeopleData(mappedData);
      console.log("Fetched people data successfully.");
    } catch (error) {
      console.error("Error fetching people data:", error);
      alert("Failed to fetch people data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const callApiAndFetchHouseSections = async () => {
    try {
      const data = await fetchHouseSections();
      setHouseSections(data);
    } catch (error) {
      console.error("Error fetching house sections:", error);
    }
  };

  const callApiAndCreateUser = async (newUser) => {
    try {
      setIsProcessing(true);
      await createNewUser(newUser);
      callApiAndFetchPeople();
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsProcessing(false);
      setIsCreateModalOpen(false);
    }
  };

  const callApiAndUpdateUser = async (updatedUser) => {
    try {
      setIsProcessing(true);
      await updateUser(updatedUser);
      callApiAndFetchPeople();
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsProcessing(false);
      setIsEditModalOpen(false);
    }
  };

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEditProfileClick = (person) => {
    setEditUserData(person);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>People - Dakoke Springs</title>
      </Helmet>
      <Navbar />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="main-container">
            <PeopleSidebar
              people={peopleData}
              onPersonClick={handlePersonClick}
              setIsCreateModalOpen={setIsCreateModalOpen}
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
            <PeopleManagement
              selectedPerson={selectedPerson}
              onEditProfileClick={handleEditProfileClick}
            />
          </div>
          <Footer />
        </>
      )}

      <ModalWrapper
        isOpen={isCreateModalOpen}
        onRequestClose={() => setIsCreateModalOpen(false)}
      >
        <AddUserForm
          onSubmit={callApiAndCreateUser}
          houseSections={houseSections}
          isProcessing={isProcessing}
        />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <EditUserForm
          onSubmit={callApiAndUpdateUser}
          userData={editUserData}
          houseSections={houseSections}
          isProcessing={isProcessing}
        />
      </ModalWrapper>
    </>
  );
};

export default People;
