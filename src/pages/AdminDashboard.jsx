import React from 'react';
import { useAuth } from '../context/AuthContext';
import PatientList from '../components/Patients/PatientList';
import IncidentList from '../components/Incidents/IncidentList';
import CalendarView from '../components/Calendar/CalendarView';

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="p-4">
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={logout} className="bg-red-500 px-4 py-2 text-white rounded">
          Logout
        </button>
      </div>

      <PatientList />
      <IncidentList />
      <CalendarView />
    </div>
  );
};

export default AdminDashboard;
