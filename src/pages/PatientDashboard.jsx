import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDaysIcon, ClipboardDocumentCheckIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const PatientDashboard = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser?.role !== 'patient') return;
    setUser(storedUser);
    setAppointments(storedUser.appointments || []);
  }, []);

  const upcomingAppointments = appointments.filter(app => app.status === 'upcoming');
  const historyAppointments = appointments.filter(app => app.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          👋 Welcome, {user?.name}
        </h1>

        {/* Upcoming Appointments */}
        <section className="mb-12">
          <div className="flex items-center mb-4 gap-2">
            <CalendarDaysIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-blue-700">Upcoming Appointments</h2>
          </div>

          {upcomingAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingAppointments.map(app => (
                <motion.div
                  key={app.id}
                  className="bg-white p-5 rounded-xl shadow hover:shadow-lg border transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <p><strong>Date:</strong> {app.date}</p>
                  <p><strong>Time:</strong> {app.time}</p>
                  <p><strong>Treatment:</strong> {app.treatment}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No upcoming appointments found.</p>
          )}
        </section>

        {/* Appointment History */}
        <section>
          <div className="flex items-center mb-4 gap-2">
            <ClipboardDocumentCheckIcon className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-semibold text-green-700">Appointment History</h2>
          </div>

          {historyAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {historyAppointments.map(app => (
                <motion.div
                  key={app.id}
                  className="bg-white p-5 rounded-xl shadow hover:shadow-lg border transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <p><strong>Date:</strong> {app.date}</p>
                  <p><strong>Treatment:</strong> {app.treatment}</p>
                  <p><strong>Cost:</strong> ₹{app.cost}</p>
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
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No appointment history found.</p>
          )}
        </section>
      </motion.div>
    </div>
  );
};

export default PatientDashboard;
