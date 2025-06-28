import React from 'react';
import { useAuth } from '../context/AuthContext';
import PatientList from '../components/Patients/PatientList';

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={logout} className="bg-red-500 px-4 py-2 text-white rounded">
          Logout
        </button>
      </div>

      <PatientList />
      <IncidentList />
    </div>
  );
};

export default AdminDashboard;
