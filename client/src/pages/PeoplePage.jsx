import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";
import PeopleManagement from "../components/People/PeopleManagement";
import Sidebar from "../components/People/Sidebar";
import AddUserForm from "../components/People/AddUserForm";
import EditUserForm from "../components/People/EditUserForm";
import Spinner from "../components/Spinner/Spinner";

import { fetchHouseSections, getUsers } from "../resources/apiPeople";

const People = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [peopleData, setPeopleData] = useState([]);
  const [houseSections, setHouseSections] = useState([]);
  const [editUserData, setEditUserData] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    callApiAndGetUsers();
    callApiAndGetHouseSections();
  }, []);

  const callApiAndGetUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getUsers();

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
      callApiAndGetUsers();
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
            <Sidebar
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
