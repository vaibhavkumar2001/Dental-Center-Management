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
  const getDateKey = (dateObj) => dateObj.toISOString().split('T')[0];
  const getIncidentsForDate = (dateStr) =>
    incidents.filter((i) => i.appointmentDate.startsWith(dateStr));
  const getPatientName = (id) =>
    patients.find((p) => p.id === id)?.name || 'Unknown';

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

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => changeMonth(-1)}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded font-medium text-sm transition"
          >
            ← Previous
          </button>
          <h3 className="text-lg font-semibold text-gray-800">
            {new Date(currentYear, currentMonth).toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </h3>
          <button
            onClick={() => changeMonth(1)}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded font-medium text-sm transition"
          >
            Next →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center font-medium text-gray-600 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-sm">{day}</div>
          ))}
        </div>

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

            // Dynamic background
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
                <div
                  className={`text-sm font-semibold ${
                    isToday ? 'text-indigo-700' : 'text-gray-700'
                  }`}
                >
                  {dateObj?.getDate()}
                </div>

                {hasAppointments && (
                  <div className="mt-auto flex flex-wrap gap-1">
                    {dayIncidents.map((incident, i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-green-500"
                        title={incident.title}
                      ></span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedDate && (
            <motion.div
              className="mt-8"
              key="appointments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-blue-600">
                📍 Appointments on {selectedDate}
              </h3>

              {getIncidentsForDate(selectedDate).length === 0 ? (
                <p className="text-gray-500">No appointments for this day.</p>
              ) : (
                <ul className="space-y-3">
                  {getIncidentsForDate(selectedDate).map((i) => (
                    <li key={i.id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:ring-1 hover:ring-blue-300 transition">
                      <div className="text-sm font-bold text-gray-800">{i.title}</div>
                      <div className="text-xs text-gray-700">👤 {getPatientName(i.patientId)}</div>
                      <div className="text-xs text-gray-600">💬 {i.comments || '-'}</div>
                      <div className="text-xs text-gray-600">💰 ₹{i.cost || 0}</div>
                      <div className="text-xs text-gray-500 italic">
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
    </div>
  );
};

export default CalendarView;
