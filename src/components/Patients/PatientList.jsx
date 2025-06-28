import React, { useEffect, useState } from 'react';
import { getPatients, deletePatient } from '../../utils/patientUtils';
import PatientForm from './PatientForm';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  const loadPatients = () => {
    setPatients(getPatients());
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      deletePatient(id);
      loadPatients();
    }
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
  };

  const handleFormComplete = () => {
    setEditingPatient(null);
    loadPatients();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Patient Management</h2>

      <PatientForm onComplete={handleFormComplete} initialData={editingPatient} />

      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th>DOB</th>
            <th>Contact</th>
            <th>Health Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr><td colSpan="5" className="text-center py-4 text-gray-500">No patients found.</td></tr>
          ) : (
            patients.map(patient => (
              <tr key={patient.id} className="text-center border-b">
                <td className="p-2">{patient.name}</td>
                <td>{patient.dob}</td>
                <td>{patient.contact}</td>
                <td>{patient.healthInfo}</td>
                <td>
                  <button
                    onClick={() => handleEdit(patient)}
                    className="px-2 py-1 text-sm bg-blue-500 text-white rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id)}
                    className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
