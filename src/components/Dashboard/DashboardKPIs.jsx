// ✅ Put this at the very top
import React, { useEffect, useState } from 'react';

const DashboardKPIs = () => {
  const [nextAppointments, setNextAppointments] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [topPatients, setTopPatients] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const incidents = JSON.parse(localStorage.getItem("incidents") || "[]");
    const patients = JSON.parse(localStorage.getItem("patients") || "[]");
    const now = new Date();

    const upcoming = incidents
      .filter(i => new Date(i.datetime) > now)
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
      .slice(0, 10);
    setNextAppointments(upcoming);

    setPendingCount(incidents.filter(i => i.status === "pending").length);
    setCompletedCount(incidents.filter(i => i.status === "completed").length);

    const revenueMap = {};
    incidents.forEach(i => {
      if (i.status === "completed" && i.cost) {
        revenueMap[i.patientId] = (revenueMap[i.patientId] || 0) + Number(i.cost);
      }
    });

    const sorted = Object.entries(revenueMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, revenue]) => {
        const patient = patients.find(p => p.id === id);
        return { name: patient?.name || "Unknown", revenue };
      });

    setTopPatients(sorted);

    const total = incidents.reduce((acc, i) =>
      acc + (i.status === "completed" && i.cost ? Number(i.cost) : 0), 0);
    setTotalRevenue(total);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-blue-50 p-4 rounded-xl shadow">
        <h4 className="font-semibold text-blue-800 mb-2">Next 10 Appointments</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          {nextAppointments.length === 0 && <li>No upcoming appointments</li>}
          {nextAppointments.map((a, i) => (
            <li key={i}>{new Date(a.datetime).toLocaleString()}</li>
          ))}
        </ul>
      </div>

      <div className="bg-yellow-50 p-4 rounded-xl shadow">
        <h4 className="font-semibold text-yellow-800 mb-2">Treatment Status</h4>
        <p className="text-sm text-gray-700">✅ Completed: {completedCount}</p>
        <p className="text-sm text-gray-700">⏳ Pending: {pendingCount}</p>
      </div>

      <div className="bg-green-50 p-4 rounded-xl shadow">
        <h4 className="font-semibold text-green-800 mb-2">Top Patients</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          {topPatients.map((p, i) => (
            <li key={i}>{p.name}: ₹{p.revenue}</li>
          ))}
        </ul>
      </div>

      <div className="bg-purple-50 p-4 rounded-xl shadow">
        <h4 className="font-semibold text-purple-800 mb-2">Total Revenue</h4>
        <p className="text-2xl font-bold text-purple-900">₹{totalRevenue}</p>
      </div>
    </div>
  );
};

export default DashboardKPIs;
