import React, { useEffect, useState } from 'react';
import { getIncidents, deleteIncident } from '../../utils/incidentUtils';
import { getPatients } from '../../utils/patientUtils';
import IncidentForm from './IncidentForm';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setIncidents(getIncidents());
    setPatients(getPatients());
  };

  useEffect(() => {
    load();
  }, []);

  const findPatientName = (id) => patients.find(p => p.id === id)?.name || 'Unknown';

  const onDelete = (id) => {
    if (window.confirm("Delete this appointment?")) {
      deleteIncident(id);
      load();
    }
  };

  return (
    <div className="mt-8">
      <IncidentForm initialData={editing} onComplete={() => {
        setEditing(null);
        load();
      }} />

      <h3 className="mt-8 font-bold text-lg">Appointments</h3>
      <table className="w-full mt-4 border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th>Patient</th>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Cost</th>
            <th>Files</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map(inc => (
            <tr key={inc.id} className="text-center border-b">
              <td>{findPatientName(inc.patientId)}</td>
              <td>{inc.title}</td>
              <td>{new Date(inc.appointmentDate).toLocaleString()}</td>
              <td>{inc.status || '-'}</td>
              <td>₹{inc.cost || 0}</td>
              <td>
                {inc.files?.map((f, i) => (
                  <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mr-1">{f.name}</a>
                ))}
              </td>
              <td>
                <button onClick={() => setEditing(inc)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 text-xs">Edit</button>
                <button onClick={() => onDelete(inc.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Delete</button>
              </td>
            </tr>
          ))}
          {incidents.length === 0 && <tr><td colSpan="7" className="text-gray-500 py-4">No appointments</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentList;
