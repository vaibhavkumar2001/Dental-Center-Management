import React from 'react';

const MockDataButton = () => {
  const generateMockData = () => {
    const mockPatients = [
      { id: "p1", name: "John Doe", dob: "1990-05-15", contact: "9876543210", healthInfo: "Diabetes" },
      { id: "p2", name: "Jane Smith", dob: "1985-11-22", contact: "8765432109", healthInfo: "Asthma" },
      { id: "p3", name: "Ali Khan", dob: "1995-01-10", contact: "9123456780", healthInfo: "None" },
      { id: "p4", name: "Riya Patel", dob: "1998-07-08", contact: "9898989898", healthInfo: "Thyroid" },
      { id: "p5", name: "Carlos Gomez", dob: "1980-03-27", contact: "9988776655", healthInfo: "Hypertension" }
    ];

    const mockIncidents = [
      // p1
      { id: "i1", patientId: "p1", title: "Root Canal", datetime: "2025-06-30T10:30", status: "completed", cost: 3000 },
      { id: "i2", patientId: "p1", title: "Cleaning", datetime: "2025-07-05T09:00", status: "pending" },
      // p2
      { id: "i3", patientId: "p2", title: "Filling", datetime: "2025-07-01T14:00", status: "completed", cost: 1500 },
      { id: "i4", patientId: "p2", title: "Follow-up", datetime: "2025-07-03T15:00", status: "pending" },
      // p3
      { id: "i5", patientId: "p3", title: "Braces Consult", datetime: "2025-07-04T12:00", status: "completed", cost: 500 },
      // p4
      { id: "i6", patientId: "p4", title: "Extraction", datetime: "2025-07-01T10:00", status: "completed", cost: 2000 },
      // p5
      { id: "i7", patientId: "p5", title: "Implant", datetime: "2025-07-07T11:30", status: "pending" },
      { id: "i8", patientId: "p5", title: "Checkup", datetime: "2025-07-09T16:00", status: "pending" },
    ];

    localStorage.setItem("patients", JSON.stringify(mockPatients));
    localStorage.setItem("incidents", JSON.stringify(mockIncidents));

    alert("✅ Mock patients and incidents added to localStorage!");
  };

  return (
    <div className="p-4">
      <button
        onClick={generateMockData}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
      >
        🧪 Generate Mock Data
      </button>
    </div>
  );
};

export default MockDataButton;
