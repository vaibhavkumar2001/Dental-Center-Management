import React, { useEffect, useState } from 'react';
import { getIncidents } from '../../utils/incidentUtils';
import { getPatients } from '../../utils/patientUtils';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarView = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [patientFilter, setPatientFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showUnbooked, setShowUnbooked] = useState(false);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    setIncidents(getIncidents());
    setPatients(getPatients());
  }, []);

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getDateKey = (dateObj) => dateObj.toISOString().split('T')[0];

  const getPatientName = (id) => patients.find((p) => p.id === id)?.name || 'Unknown';

  const filteredIncidents = incidents.filter((i) => {
    const matchPatient = patientFilter ? i.patientId === patientFilter : true;
    const matchStatus = statusFilter ? i.status === statusFilter : true;
    return matchPatient && matchStatus;
  });

  const getIncidentsForDate = (dateStr) =>
    filteredIncidents.filter(
      (i) =>
        (showUnbooked || i.isBooked === true) &&
        i.appointmentDate &&
        i.appointmentDate.startsWith(dateStr)
    );

  const changeMonth = (offset) => {
    const newDate = new Date(currentYear, currentMonth + offset);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
    setSelectedDate(null);
  };

  const daysArray = () => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = daysInMonth(currentMonth, currentYear);
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(currentYear, currentMonth, d));
    }
    return days;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <motion.h2
          className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-md shadow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🦷 Dental Appointment Calendar
        </motion.h2>

        {/* Filters + Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Patient</label>
            <select
              value={patientFilter}
              onChange={(e) => setPatientFilter(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Patients</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Follow-up">Follow-up</option>
            </select>
          </div>

          <div className="flex justify-between items-end gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Show Unbooked</label>
              <input
                type="checkbox"
                checked={showUnbooked}
                onChange={(e) => setShowUnbooked(e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <button
              onClick={() => {
                setPatientFilter('');
                setStatusFilter('');
                setSelectedDate(null);
              }}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:shadow-lg hover:from-red-600 hover:to-pink-600 transition-all text-sm"
            >
              🔄 Clear Filters
            </button>
          </div>
        </div>

        {/* Booked vs Unbooked Summary */}
        <div className="mb-6 flex gap-4 justify-end">
          <div className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
            ✅ Booked: {filteredIncidents.filter(i => i.isBooked).length}
          </div>
          <div className="text-sm font-medium bg-red-100 text-red-800 px-3 py-1 rounded-full">
            ❌ Unbooked: {filteredIncidents.filter(i => !i.isBooked).length}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {daysArray().map((dateObj, idx) => {
            const dateStr = dateObj ? getDateKey(dateObj) : null;
            const dayIncidents = dateStr ? getIncidentsForDate(dateStr) : [];
            const isToday =
              dateObj &&
              dateObj.getDate() === today.getDate() &&
              dateObj.getMonth() === today.getMonth() &&
              dateObj.getFullYear() === today.getFullYear();
            const isSelected = dateStr === selectedDate;
            const hasAppointments = dayIncidents.length > 0;

            let boxBg = 'bg-gray-50';
            if (isToday) boxBg = 'bg-indigo-100';
            else if (isSelected) boxBg = 'bg-blue-100';
            else if (hasAppointments) boxBg = 'bg-green-50';

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={() => dateObj && setSelectedDate(dateStr)}
                className={`h-24 p-2 border rounded-xl shadow-sm transition-all flex flex-col justify-between cursor-pointer
                  ${boxBg}
                  ${isSelected ? 'border-blue-400 ring-2 ring-blue-400' : 'border-gray-200'}
                `}
              >
                <div className={`text-sm font-semibold ${isToday ? 'text-indigo-700' : 'text-gray-700'}`}>
                  {dateObj?.getDate()}
                </div>
                {hasAppointments && (
                  <div className="mt-auto flex flex-wrap gap-1">
                    {dayIncidents.map((incident, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          incident.isBooked ? 'bg-green-500' : 'bg-red-400'
                        }`}
                        title={incident.title}
                      ></span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
