import React from 'react';
import { useAuth } from '../context/AuthContext';
import PatientList from '../components/Patients/PatientList';
import IncidentList from '../components/Incidents/IncidentList';
import CalendarView from '../components/Calender/CalendarView';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            🦷 Welcome, {user?.email}
          </h1>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      <section className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">👥 Patient Management</h2>
        <PatientList />
      </section>

      <section className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">📂 Appointment / Incident Management</h2>
        <IncidentList />
      </section>

      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">📅 Calendar View</h2>
        <CalendarView />
      </section>
    </div>
  );
};

export default AdminDashboard;
