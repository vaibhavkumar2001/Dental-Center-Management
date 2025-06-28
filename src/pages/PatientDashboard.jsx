import React from 'react';
import { useAuth } from '../context/AuthContext';

const PatientDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Patient Dashboard</h1>
      <button onClick={logout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </button>
    </div>
  );
};

export default PatientDashboard;
