import React, { useEffect, useState } from 'react';
import { getPatients } from '../../utils/patientUtils';
import { addIncident, updateIncident } from '../../utils/incidentUtils';

const emptyForm = {
  patientId: '',
  title: '',
  description: '',
  comments: '',
  appointmentDate: '',
  cost: '',
  treatment: '',
  status: '',
  nextDate: '',
  files: []
};

const IncidentForm = ({ initialData = null, onComplete }) => {
  const [form, setForm] = useState(emptyForm);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(getPatients());
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const fileObj = {
        name: file.name,
        url: reader.result
      };
      setForm((prev) => ({
        ...prev,
        files: [...prev.files, fileObj]
      }));
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patientId || !form.title || !form.appointmentDate) {
      alert("Patient, Title, and Appointment Date are required.");
      return;
    }

    if (initialData) {
      updateIncident(initialData.id, form);
    } else {
      addIncident(form);
    }

    onComplete();
    setForm(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded shadow-sm">
      <h3 className="font-semibold mb-3">{initialData ? 'Edit' : 'Add'} Incident</h3>
      <div className="grid grid-cols-2 gap-4">
        <select name="patientId" value={form.patientId} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Patient</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="border p-2 rounded" required />
        <input type="datetime-local" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="status" placeholder="Status (Pending/Completed)" value={form.status} onChange={handleChange} className="border p-2 rounded" />
        <input type="number" name="cost" placeholder="Cost (₹)" value={form.cost} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="treatment" placeholder="Treatment Info" value={form.treatment} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="comments" placeholder="Comments" value={form.comments} onChange={handleChange} className="border p-2 rounded" />
        <input type="date" name="nextDate" value={form.nextDate} onChange={handleChange} className="border p-2 rounded" />

        <input type="file" onChange={handleFileChange} className="col-span-2 border p-2 rounded" />
      </div>

      <div className="mt-4">
        {form.files.length > 0 && (
          <div className="text-sm text-gray-700">
            Attached: {form.files.map((f, i) => (
              <span key={i} className="mr-2">{f.name}</span>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        {initialData ? 'Update' : 'Add'} Incident
      </button>
    </form>
  );
};

export default IncidentForm;
