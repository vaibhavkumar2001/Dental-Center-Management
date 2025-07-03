import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  // ✅ Seed users on first load
  useEffect(() => {
    if (!localStorage.getItem("users")) {
      const users = [
        {
          id: 'admin001',
          name: 'Dr. Admin',
          email: 'admin@example.com',
          password: 'admin123',
          role: 'admin',
        },
        {
          id: 'p001',
          name: 'John Doe',
          email: 'john@example.com',
          password: 'john123',
          role: 'patient',
          appointments: [
            {
              id: 'a001',
              date: '2025-07-02',
              time: '10:00 AM',
              treatment: 'Teeth Cleaning',
              cost: 800,
              status: 'upcoming',
              attachment: '',
            },
          ],
        },
      ];

      localStorage.setItem("users", JSON.stringify(users));
      console.log("✅ Sample users seeded.");
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* ✅ Redirect root to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ✅ Valid routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />

        {/* ✅ Catch-all for 404s */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
