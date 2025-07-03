import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon, UserIcon } from '@heroicons/react/24/solid';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(allUsers);
  }, []);

  const handleUpdateStatus = (patientId, appointmentId, newStatus) => {
    const updatedUsers = users.map(user => {
      if (user.id === patientId) {
        const updatedAppointments = user.appointments.map(app => {
          if (app.id === appointmentId) {
            return { ...app, status: newStatus };
          }
          return app;
        });
        return { ...user, appointments: updatedAppointments };
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const allAppointments = users
    .filter(u => u.role === 'patient')
    .flatMap(user =>
      (user.appointments || []).map(app => ({
        ...app,
        patientName: user.name,
        patientId: user.id,
        email: user.email,
      }))
    );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        🛠 Admin Dashboard – Approve/Reject Appointments
      </h1>

      {allAppointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allAppointments.map(app => (
            <div
              key={app.id}
              className="bg-white p-5 rounded-xl shadow border hover:shadow-lg transition-all"
            >
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                <UserIcon className="w-5 h-5 text-indigo-500" />
                {app.patientName} ({app.email})
              </div>
              <p><strong>🆔 ID:</strong> {app.id}</p>
              <p><strong>💊 Treatment:</strong> {app.treatment}</p>
              <p><strong>🗓 Date:</strong> {app.date}</p>
              <p><strong>⏰ Time:</strong> {app.time}</p>
              <p><strong>💰 Cost:</strong> ₹{app.cost}</p>
              <p><strong>Status:</strong> <span className="capitalize">{app.status}</span></p>

              {app.status === 'upcoming' && (
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() =>
                      handleUpdateStatus(app.patientId, app.id, 'approved')
                    }
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    <CheckCircleIcon className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateStatus(app.patientId, app.id, 'rejected')
                    }
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    <XCircleIcon className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
