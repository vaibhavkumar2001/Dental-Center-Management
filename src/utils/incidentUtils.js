const INCIDENT_KEY = 'incidents';

export const getIncidents = () => {
  const data = localStorage.getItem(INCIDENT_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveIncidents = (data) => {
  localStorage.setItem(INCIDENT_KEY, JSON.stringify(data));
};

export const addIncident = (incident) => {
  const incidents = getIncidents();
  const newIncident = { ...incident, id: 'i' + Date.now() };
  incidents.push(newIncident);
  saveIncidents(incidents);
};

export const updateIncident = (id, updated) => {
  const incidents = getIncidents();
  const updatedList = incidents.map((i) =>
    i.id === id ? { ...i, ...updated } : i
  );
  saveIncidents(updatedList);
};

export const deleteIncident = (id) => {
  const updated = getIncidents().filter((i) => i.id !== id);
  saveIncidents(updated);
};
