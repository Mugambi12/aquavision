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

import { fetchHouseSections, fetchUsersSampleData } from "../apis/ApiPeople";
import { fetchPeople } from "../apis/ApiPeople";

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
    callApiAndfetchUsersSampleData();
    callApiAndFetchPeople();
    callApiAndGetHouseSections();
  }, []);

  const callApiAndfetchUsersSampleData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchUsersSampleData();

      const transformedPeople = data.map((person, index) => ({
        id: index + 1,
        fullName: person.name,
        gender: person.gender,
        age: person.age,
        profileImage: person.profile_picture,
        dateOfBirth: person.date_of_birth,
        phoneNumber: person.phone_number,
        emergencyContact: person.emergency_contact,
        insuranceType: person.insurance_type,
        diagnosisHistory: person.diagnosis_history,
        diagnosticList: person.diagnostic_list,
        labResults: person.lab_results,
      }));

      setPeopleData(transformedPeople);
    } catch (error) {
      console.error("Error fetching people data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const callApiAndFetchPeople = async () => {
    try {
      setIsLoading(true);
      const data = await fetchPeople();

      const mappedData = data.map((person) => {
        // Extracting the first invoice and revenue, assuming there can be multiple
        const invoice = person.invoices.length > 0 ? person.invoices[0] : {};
        const revenue = person.revenues.length > 0 ? person.revenues[0] : {};

        return {
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
          // Mapping invoice details
          invoice_id: invoice._id || null,
          invoice_user_id: invoice.user_id || null,
          invoice_house_section: invoice.house_section || null,
          invoice_house_number: invoice.house_number || null,
          invoice_previous_reading: invoice.previous_reading || null,
          invoice_current_reading: invoice.current_reading || null,
          invoice_consumption: invoice.consumption || null,
          invoice_unit_price: invoice.unit_price || null,
          invoice_service_fee: invoice.service_fee || null,
          invoice_total_amount: invoice.total_amount || null,
          invoice_payment_status: invoice.payment_status || null,
          invoice_created_at: invoice.created_at || null,
          invoice_updated_at: invoice.updated_at || null,
          invoice_deleted_at: invoice.deleted_at || null,
          // Mapping revenue details
          revenue_id: revenue._id || null,
          revenue_source: revenue.source || null,
          revenue_user_id: revenue.user_id || null,
          revenue_invoice_id: revenue.invoice_id || null,
          revenue_payment_date: revenue.payment_date || null,
          revenue_amount: revenue.amount || null,
          revenue_payment_method: revenue.payment_method || null,
          revenue_payment_status: revenue.payment_status || null,
          revenue_transaction_id: revenue.transaction_id || null,
          revenue_phone_number: revenue.phone_number || null,
          revenue_created_at: revenue.created_at || null,
          revenue_updated_at: revenue.updated_at || null,
          revenue_deleted_at: revenue.deleted_at || null,
        };
      });

      // setPeopleData(mappedData);
      console.log("Fetched people data successfully.");
      console.log("People data:", mappedData);
    } catch (error) {
      console.error("Error fetching people data:", error);
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
