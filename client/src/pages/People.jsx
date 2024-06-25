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

import { fetchHouseSections /*fetchUsers*/ } from "../apis/ApiPeople";
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
    //callApiAndfetchUsers();
    callApiAndFetchPeople();
    callApiAndGetHouseSections();
  }, []);

  //  const callApiAndfetchUsers = async () => {
  //    try {
  //      setIsLoading(true);
  //      const data = await fetchUsers();
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
  //      setPeopleData(transformedPeople);
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
      //setPeopleData(data);
      console.log("Fetched people data successfully.");
      console.log("People data:", data);
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
