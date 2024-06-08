// People.js
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/People/Sidebar/Sidebar";
import Main from "../components/People/Main/Main";
import Footer from "../components/Footer/Footer";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";
import AddUserForm from "../components/People/AddUserForm/AddUserForm";
import EditUserForm from "../components/People/EditUserForm/EditUserForm";

const People = () => {
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  const apiEndPoint = "https://fedskillstest.coalitiontechnologies.workers.dev";
  const credentials = "Y29hbGl0aW9uOnNraWxscy10ZXN0";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndPoint, {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

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

        setPeople(transformedPeople);
      } catch (error) {
        console.error("Error fetching people data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAddUser = (newUser) => {
    setPeople([...people, newUser]);
    console.log("New user:", newUser);
    setIsModalOpen(false);
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
      <div className="main-container">
        <Sidebar
          people={people}
          onPersonClick={handlePersonClick}
          setIsModalOpen={setIsModalOpen}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Main
          selectedPerson={selectedPerson}
          onEditProfileClick={handleEditProfileClick}
        />
      </div>
      <Footer />

      <ModalWrapper
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <AddUserForm onSubmit={handleAddUser} />
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
