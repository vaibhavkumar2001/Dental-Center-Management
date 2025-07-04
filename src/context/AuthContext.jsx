import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Initial hardcoded users
const initialUsers = [
  { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
  { id: "2", role: "Patient", email: "john@entnt.in", password: "patient123", patientId: "p1" }
];

// Initial hardcoded patients
const initialPatients = [
  {
    id: "p1",
    name: "John Doe",
    dob: "1990-05-10",
    contact: "1234567890",
    healthInfo: "No allergies"
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Initialize users
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(initialUsers));
      console.log("✅ Initial users added to localStorage.");
    }

    // Initialize patients
    if (!localStorage.getItem("patients")) {
      localStorage.setItem("patients", JSON.stringify(initialPatients));
      console.log("✅ Initial patients added to localStorage.");
    }
  }, []);

  const login = (email, password) => {
    const usersJSON = localStorage.getItem("users");
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
