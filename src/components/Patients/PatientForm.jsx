import React, { useEffect, useState } from 'react';
import { addPatient, updatePatient } from '../../utils/patientUtils';

const initialForm = {
  name: '',
  dob: '',
  contact: '',
  healthInfo: ''
};

const PatientForm = ({ initialData = null, onComplete }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(initialForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.dob && form.contact) {
      if (initialData) {
        updatePatient(initialData.id, form);
      } else {
        addPatient(form);
      }
      onComplete();
      setForm(initialForm);
    } else {
      alert("Please fill all required fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded shadow-sm mb-4">
      <h3 className="font-semibold mb-3">{initialData ? 'Edit Patient' : 'Add New Patient'}</h3>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="contact"
          value={form.contact}
          placeholder="Contact Number"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="healthInfo"
          value={form.healthInfo}
          placeholder="Health Info"
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <button type="submit" className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
        {initialData ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default PatientForm;
