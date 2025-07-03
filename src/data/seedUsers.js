export const seedUsers = () => {
  const users = [
    {
      id: "p001",
      name: "John Doe",
      email: "john@example.com",
      password: "john123",
      role: "patient",
      appointments: [
        {
          id: "a001",
          date: "2025-07-01",
          time: "10:30 AM",
          treatment: "Root Canal",
          cost: 4500,
          status: "upcoming",
          attachment: ""
        },
        {
          id: "a002",
          date: "2025-06-20",
          time: "2:00 PM",
          treatment: "Teeth Cleaning",
          cost: 1200,
          status: "completed",
          attachment: "https://example.com/files/cleaning-report-john.pdf"
        }
      ]
    },
    {
      id: "p002",
      name: "Jane Smith",
      email: "jane@example.com",
      password: "jane123",
      role: "patient",
      appointments: [
        {
          id: "a003",
          date: "2025-07-10",
          time: "11:00 AM",
          treatment: "Cavity Filling",
          cost: 1800,
          status: "upcoming",
          attachment: ""
        },
        {
          id: "a004",
          date: "2025-06-05",
          time: "4:30 PM",
          treatment: "Braces Adjustment",
          cost: 3000,
          status: "completed",
          attachment: "https://example.com/files/braces-adjustment-jane.pdf"
        }
      ]
    }
  ];

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(users[0])); // Set John Doe as default login
};
