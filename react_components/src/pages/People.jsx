import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/People/Sidebar/Sidebar";
import Main from "../components/People/Main/Main";
import Footer from "../components/Footer/Footer";

const People = () => {
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

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
  };

  const [newPeople, setNewPeople] = useState([
    // initial people data
  ]);

  const handleAddUser = (newUser) => {
    setNewPeople([...newPeople, newUser]);
    console.log("New user added:", newUser);
    console.log("New people:", newPeople);
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar
          people={people}
          onPersonClick={handlePersonClick}
          onAddUser={handleAddUser}
        />
        <Main person={selectedPerson} />
      </div>
      <Footer />
    </>
  );
};

export default People;
