import React from 'react';
import { useAuth } from '../context/AuthContext';
import PatientList from '../components/Patients/PatientList';
import IncidentList from '../components/Incidents/IncidentList';
import CalendarView from '../components/Calender/CalendarView';
import DashboardKPIs from '../components/Dashboard/DashboardKPIs';
import MockDataButton from '../components/Dev/MockDataButton';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 p-6 transition-all">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 sticky top-0 bg-white z-10 p-4 rounded-xl shadow-md">
        <div>
          <h1 className="text-2xl font-extrabold text-indigo-700">
            🦷 Welcome, {user?.email}
          </h1>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          🚪 Logout
        </button>
      </header>

      {/* Mock Data Button */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="mb-6"
      >
        <MockDataButton />
      </motion.div>

      {/* KPIs */}
      <motion.section
        custom={1}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="bg-white rounded-2xl shadow-md p-6 mb-8 hover:shadow-xl transition"
      >
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          📊 Dashboard KPIs
        </h2>
        <DashboardKPIs />
      </motion.section>

      {/* Patient Management */}
      <motion.section
        custom={2}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="bg-white rounded-2xl shadow-md p-6 mb-8 hover:shadow-xl transition"
      >
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          👥 Patient Management
        </h2>
        <PatientList />
      </motion.section>

      {/* Incident / Appointment Management */}
      <motion.section
        custom={3}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="bg-white rounded-2xl shadow-md p-6 mb-8 hover:shadow-xl transition"
      >
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          📂 Appointments & Incidents
        </h2>
        <IncidentList />
      </motion.section>

      {/* Calendar */}
      <motion.section
        custom={4}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
      >
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          📅 Calendar View
        </h2>
        <CalendarView />
      </motion.section>
    </div>
  );
};

export default AdminDashboard;
