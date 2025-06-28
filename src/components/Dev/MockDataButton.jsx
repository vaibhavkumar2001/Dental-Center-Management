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
      // All 5 patients have at least one completed treatment with cost
      { id: "i1", patientId: "p1", title: "Root Canal", datetime: "2025-06-30T10:30", status: "completed", cost: 3000 },
      { id: "i2", patientId: "p2", title: "Filling", datetime: "2025-07-01T14:00", status: "completed", cost: 1500 },
      { id: "i3", patientId: "p3", title: "Braces Consult", datetime: "2025-07-04T12:00", status: "completed", cost: 500 },
      { id: "i4", patientId: "p4", title: "Extraction", datetime: "2025-07-01T10:00", status: "completed", cost: 2000 },
      { id: "i5", patientId: "p5", title: "Checkup", datetime: "2025-07-02T11:00", status: "completed", cost: 1000 },
      
      // Some upcoming appointments for KPIs
      { id: "i6", patientId: "p1", title: "Follow-up", datetime: "2025-07-05T09:00", status: "pending" },
      { id: "i7", patientId: "p2", title: "Cleaning", datetime: "2025-07-06T10:00", status: "pending" },
      { id: "i8", patientId: "p3", title: "Whitening", datetime: "2025-07-07T11:00", status: "pending" },
      { id: "i9", patientId: "p4", title: "Consultation", datetime: "2025-07-08T12:00", status: "pending" },
      { id: "i10", patientId: "p5", title: "Implant Planning", datetime: "2025-07-09T13:00", status: "pending" },
    ];

    localStorage.setItem("patients", JSON.stringify(mockPatients));
    localStorage.setItem("incidents", JSON.stringify(mockIncidents));

    alert("✅ 5 mock patients and 10 incidents added to localStorage!");
    window.location.reload(); // auto-refresh dashboard
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
