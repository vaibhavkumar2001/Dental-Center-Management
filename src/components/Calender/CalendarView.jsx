import React, { useEffect, useState } from 'react';
import { getIncidents } from '../../utils/incidentUtils';
import { getPatients } from '../../utils/patientUtils';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarView = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    setIncidents(getIncidents());
    setPatients(getPatients());
  }, []);

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const getDateKey = (dateObj) =>
    dateObj.toISOString().split('T')[0]; // Format: yyyy-mm-dd

  const getIncidentsForDate = (dateStr) =>
    incidents.filter(i => i.appointmentDate.startsWith(dateStr));

  const getPatientName = (id) => {
    const p = patients.find(p => p.id === id);
    return p ? p.name : "Unknown";
  };

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

    for (let i = 0; i < firstDay; i++) days.push(null); // empty cells
    for (let d = 1; d <= totalDays; d++) days.push(new Date(currentYear, currentMonth, d));

    return days;
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-xl mt-6">
      <motion.h2
        className="text-2xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📅 Calendar View
      </motion.h2>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition"
        >
          ← Prev
        </button>
        <h3 className="text-lg font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          onClick={() => changeMonth(1)}
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition"
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-600 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {daysArray().map((dateObj, idx) => {
          const dateStr = dateObj ? getDateKey(dateObj) : null;
          const dayIncidents = dateStr ? getIncidentsForDate(dateStr) : [];

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onClick={() => dateObj && setSelectedDate(dateStr)}
              className={`h-24 p-2 border rounded-lg cursor-pointer transition-colors flex flex-col justify-between ${
                dateStr === selectedDate ? 'bg-blue-100 border-blue-400' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="text-sm font-medium">{dateObj?.getDate()}</div>
              <div className="text-xs text-blue-600 font-semibold">
                {dayIncidents.length > 0 && `${dayIncidents.length} appt.`}
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedDate && (
          <motion.div
            className="mt-6"
            key="appointments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <h3 className="text-lg font-bold mb-2 text-blue-700">
              Appointments on {selectedDate}
            </h3>

            {getIncidentsForDate(selectedDate).length === 0 ? (
              <p className="text-gray-500">No appointments.</p>
            ) : (
              <ul className="space-y-3">
                {getIncidentsForDate(selectedDate).map((i) => (
                  <li key={i.id} className="bg-gray-100 border p-3 rounded-lg">
                    <div className="text-sm font-semibold">{i.title}</div>
                    <div className="text-xs">👤 {getPatientName(i.patientId)}</div>
                    <div className="text-xs">💬 {i.comments || '-'}</div>
                    <div className="text-xs">💰 ₹{i.cost || 0}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(i.appointmentDate).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarView;
