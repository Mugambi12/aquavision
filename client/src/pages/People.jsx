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

import { fetchPeople, fetchHouseSections } from "../apis/ApiPeople";
import { fetchUsersSampleData } from "../apis/ApiPeople";

const People = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [peopleData, setPeopleData] = useState([]);
  const [houseSections, setHouseSections] = useState([]);
  const [editUserData, setEditUserData] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    //    callApiAndfetchUsersSampleData();
    callApiAndFetchPeople();
    callApiAndGetHouseSections();
  }, []);

  //  const callApiAndfetchUsersSampleData = async () => {
  //    try {
  //      setIsLoading(true);
  //      const data = await fetchUsersSampleData();
  //
  //      const transformedPeople = data.map((person, index) => ({
  //        id: index + 1,
  //        fullName: person.name,
  //        gender: person.gender,
  //        age: person.age,
  //        profileImage: person.profile_picture,
  //        dateOfBirth: person.date_of_birth,
  //        phoneNumber: person.phone_number,
  //        emergencyContact: person.emergency_contact,
  //        insuranceType: person.insurance_type,
  //        diagnosisHistory: person.diagnosis_history,
  //        diagnosticList: person.diagnostic_list,
  //        labResults: person.lab_results,
  //      }));
  //
  //      //setPeopleData(transformedPeople);
  //      console.log(
  //        "Fetched people data successfully. Sample data:",
  //        transformedPeople
  //      );
  //    } catch (error) {
  //      console.error("Error fetching people data:", error);
  //    } finally {
  //      setIsLoading(false);
  //    }
  //  };

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

  const callApiAndGetHouseSections = async () => {
    try {
      const data = await fetchHouseSections();
      setHouseSections(data);
    } catch (error) {
      console.error("Error fetching house sections:", error);
    }
  };

  const callApiAndPostUser = (newUser) => {
    try {
      console.log("New user:", newUser);
      callApiAndfetchUsers();
    } catch (error) {
      console.error("Error posting new user:", error);
    } finally {
      setIsCreateModalOpen(false);
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
          onSubmit={callApiAndPostUser}
          houseSections={houseSections}
        />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <EditUserForm
          onSubmit={(editedUser) => {
            console.log("Edited user:", editedUser);
            setIsEditModalOpen(false);
          }}
          userData={editUserData}
        />
      </ModalWrapper>
    </>
  );
};

export default People;
