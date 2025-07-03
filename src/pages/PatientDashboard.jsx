import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  UserIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

const PatientDashboard = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    date: '',
    time: '',
    treatment: '',
    cost: '',
    attachment: '',
  });

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.role === 'patient') {
        setUser(parsedUser);
        setAppointments(parsedUser.appointments || []);
      }
    }
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle new appointment booking
  const handleBookAppointment = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: `a${Date.now()}`,
      ...form,
      status: 'upcoming',
      cost: parseInt(form.cost),
    };

    const updatedAppointments = [...appointments, newAppointment];
    const updatedUser = { ...user, appointments: updatedAppointments };

    // Save back to localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Optional: update users array
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = allUsers.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update UI
    setUser(updatedUser);
    setAppointments(updatedAppointments);
    setForm({ date: '', time: '', treatment: '', cost: '', attachment: '' });
    alert('✅ Appointment booked successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-4 py-6 sm:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 tracking-tight">
          👋 Welcome, {user?.name || 'Patient'}
        </h1>

        {/* Patient Info */}
        <motion.section
          className="bg-white p-6 rounded-xl shadow-xl mb-10 border border-indigo-100"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <UserIcon className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-purple-700">Patient Details</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p><strong>👤 Name:</strong> {user?.name}</p>
            <p><strong>📧 Email:</strong> {user?.email}</p>
            <p><strong>🆔 Patient ID:</strong> {user?.id}</p>
          </div>
        </motion.section>

        {/* Book Appointment Form */}
        <motion.section
          className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-xl shadow-lg mb-10 border border-blue-200"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <PlusCircleIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-blue-700">📅 Book New Appointment</h2>
          </div>
          <form onSubmit={handleBookAppointment} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="border border-blue-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className="border border-blue-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="treatment"
              value={form.treatment}
              onChange={handleChange}
              required
              placeholder="Treatment"
              className="border border-blue-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="cost"
              value={form.cost}
              onChange={handleChange}
              required
              placeholder="Cost"
              className="border border-blue-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="attachment"
              value={form.attachment}
              onChange={handleChange}
              placeholder="Attachment URL (optional)"
              className="border border-blue-300 p-2 rounded-lg col-span-1 sm:col-span-2 focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg col-span-1 sm:col-span-2 transition"
            >
              ➕ Book Appointment
            </button>
          </form>
        </motion.section>

        {/* All Appointments */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <ClipboardDocumentCheckIcon className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-semibold text-green-700">🗂 All Appointments</h2>
          </div>

          {appointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointments.map((app) => (
                <motion.div
                  key={app.id}
                  className="bg-white p-5 rounded-xl shadow hover:shadow-lg border border-gray-200 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <p><strong>🗓 Date:</strong> {app.date}</p>
                  <p><strong>⏰ Time:</strong> {app.time}</p>
                  <p><strong>💊 Treatment:</strong> {app.treatment}</p>
                  <p><strong>💰 Cost:</strong> ₹{app.cost}</p>
                  <p className="flex items-center gap-1 mt-1">
                    <strong>Status:</strong>
                    {app.status === 'completed' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-sm bg-green-100 text-green-700 rounded-full">
                        <CheckCircleIcon className="w-4 h-4" /> Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-sm bg-yellow-100 text-yellow-700 rounded-full">
                        <ClockIcon className="w-4 h-4" /> Upcoming
                      </span>
                    )}
                  </p>
                  {app.attachment && (
                    <p className="mt-2">
                      <DocumentTextIcon className="w-5 h-5 inline text-gray-500 mr-1" />
                      <a
                        href={app.attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        View Attachment
                      </a>
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No appointments found.</p>
          )}
        </motion.section>
      </motion.div>
    </div>
  );
};

export default PatientDashboard;
