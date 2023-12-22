// PatientList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch patient data from the backend
    axios
      .get("http://localhost:5000/api/patient/allpatients")
      .then((response) => {
        setPatients(response.data);
      });
  }, []);

  const deletePatient = async (id) => {
    try {
      console.log(id);
      const response = await axios.delete(
        `http://localhost:5000/api/patient/deletepatient/${id}`
      );
      const respons = await axios.get(
        "http://localhost:5000/api/patient/allpatients"
      );
      setPatients(respons.data);
      console.log("patient deleted:", response.data);
    } catch (error) {
      console.log("error deleting patient:", error);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="min-h-screen py-12 px-5 bg-slate-900 text-white">
      <div className="flex justify-between mt-10 border-0 px-5 py-2 rounded-md bg-slate-800 shadow-lg">
        <h1 className="text-2xl font-bold ">Patients</h1>
        <Link
          to="/add"
          className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Patient
        </Link>
      </div>
      <div className="py-10">
      
      <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white text-black px-4 py-2 rounded-md mb-4"
        />

        <ul className="space-y-4">
          {filteredPatients.map((patient) => (
            <li
              key={patient._id}
              className="flex items-center justify-between bg-slate-800 rounded-md p-4 shadow-md hover:shadow-xl transition hover:-translate-y-1 duration-200 "
            >
              <div>
                <Link to={`/Profile/${patient._id}`}>
                  <span className="font-semibold hover:underline text-white">
                    {patient.firstName} {patient.lastName}
                  </span>
                </Link>
              </div>
              <div>
                <Link to={`/patientRecord/${patient._id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md hover:bg-blue-600 transition duration-300">
                    Records
                  </button>
                </Link>
                <button
                  onClick={() => deletePatient(patient._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PatientList;