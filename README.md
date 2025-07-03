# 🦷 Dental Center Management Dashboard

A responsive web dashboard for managing patients, appointments, and incidents at a dental center. Built with **React**, **TailwindCSS**, and **localStorage** for rapid prototyping.

---

## 🚀 Features

- 🧑‍⚕️ **Role-based Access**: Admin and Patient dashboards
- 📋 **Patient Management**: Add, view, and manage patient details
- 📅 **Appointment & Incident Management**: View, book, approve/reject
- 📊 **KPIs Dashboard**: Key metrics like total patients and appointments
- 🗂️ **Calendar View**: Color-coded appointments with filter toggle
- 🔐 **Authentication**: Role-aware login using localStorage
- 🎨 **UI/UX**: TailwindCSS + Framer Motion for animations

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/vaibhavkumar2001/Dental-Center-Management
cd dental-center-dashboard
2. Install dependencies
bash
Copy
Edit
npm install
3. Run the app
bash
Copy
Edit
npm run dev
Visit: dental-center-management-drab.vercel.app


🧱 Project Architecture
bash
Copy
Edit
src/
├── components/           # Reusable UI components
│   ├── Patients/         # PatientList, PatientForm
│   ├── Incidents/        # AppointmentList, ApprovalPanel
│   ├── Dashboard/        # KPI cards
│   ├── Calendar/         # CalendarView
│   └── Dev/              # MockData tools (dev only)
│
├── context/              # AuthContext for login/logout
├── pages/                # AdminDashboard, PatientDashboard, Login
├── App.jsx               # Routes and layout
└── main.jsx              # React root, wrapped with AuthProvider
🛠️ Technologies Used
React – SPA architecture

TailwindCSS – Utility-first styling

Framer Motion – Animations & transitions

React Router – Route handling

localStorage – Data persistence

🔐 Default Test Credentials
bash
Copy
Edit
Admin:
  Email:    admin@entnt.in
  Password: admin123

Patient:
  Email:    john@entnt.in
  Password: patient123
⚠️ Known Issues
Data is not persisted across devices or browsers (no backend)

No real authentication (uses localStorage only)

No validation or file upload for attachments

Booked/unbooked logic may fail if appointments overlap

🧠 Technical Decisions
localStorage instead of DB for simplicity & offline demo

Context API for auth state to keep it global

No Redux – project is small enough for context

Component-based structure for scalability

Hardcoded seed data for users & patients in context on app load



