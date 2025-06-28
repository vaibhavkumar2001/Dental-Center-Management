const PATIENT_KEY = 'patients';

export const getPatients = () => {
  const data = localStorage.getItem(PATIENT_KEY);
  return data ? JSON.parse(data) : [];
};

export const savePatients = (patients) => {
  localStorage.setItem(PATIENT_KEY, JSON.stringify(patients));
};

export const addPatient = (patient) => {
  const patients = getPatients();
  const newPatient = { ...patient, id: 'p' + Date.now() };
  patients.push(newPatient);
  savePatients(patients);
  return newPatient;
};

export const updatePatient = (id, updatedData) => {
  const patients = getPatients();
  const updatedList = patients.map(p =>
    p.id === id ? { ...p, ...updatedData } : p
  );
  savePatients(updatedList);
};

export const deletePatient = (id) => {
  const patients = getPatients().filter(p => p.id !== id);
  savePatients(patients);
};
