# MedCare Plus — Hospital Appointment System

A sleek, elegant, and professional full-stack web application built using **React (Vite)**, **Express.js**, and **MongoDB**.

---

## 🚀 Quick Setup & Run Instructions

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
*The backend server runs on `http://localhost:5000`.*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*The frontend React application runs on `http://localhost:3000`.*

---

## ⚙️ Environment Variables (`.env`)
Create a `.env` file inside the `backend` folder or root directory using `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hospital_db
```

---

## 🎓 Tasks Summary & Viva Explanation Guide

### Task 1 — React Component Architecture (4 Marks)
- **`AppointmentCard` Component** ([`AppointmentCard.jsx`](file:///c:/Users/Khanjan%20Thakkar/OneDrive/Desktop/awdf/frontend/src/components/AppointmentCard.jsx)): Reusable card component accepting 5 props (`patientName`, `doctorName`, `date`, `timeSlot`, `status`).
- **Dynamic CSS Status Styling**: Uses CSS classes (`status-confirmed`, `status-pending`, `status-cancelled`) to visually differentiate appointment status.

### Task 2 — React Routing and State Management (4 Marks)
- **React Router Navigation** ([`Navbar.jsx`](file:///c:/Users/Khanjan%20Thakkar/OneDrive/Desktop/awdf/frontend/src/components/Navbar.jsx)): Configured single-page app routing across `/`, `/doctors`, and `/booking` without full-page reloads.
- **State Management** ([`BookingPage.jsx`](file:///c:/Users/Khanjan%20Thakkar/OneDrive/Desktop/awdf/frontend/src/pages/BookingPage.jsx)): Managed form state using `useState` (`formData` object and `selectedDoctor`), rendering real-time live preview of input fields as the user types.

### Task 3 — Express REST API + Middleware (4 Marks)
- **Express Backend** ([`server.js`](file:///c:/Users/Khanjan%20Thakkar/OneDrive/Desktop/awdf/backend/server.js)): Created 3 REST endpoints:
  - `GET /api/v1/appointments` (Returns all appointments, 200 OK)
  - `POST /api/v1/appointments` (Creates a new appointment, 201 Created)
  - `GET /api/v1/doctors` (Returns all doctors, 200 OK)
- **Custom Request Logger Middleware**: Globally logs every request in `[METHOD] [PATH] [TIMESTAMP]` format.
- **Global Error-Handling Middleware**: Placed as the last middleware to catch errors and return structured JSON responses without exposing raw stack traces.

### Task 4 — REST API Consumption in React (4 Marks)
- **API Fetching** ([`DoctorsPage.jsx`](file:///c:/Users/Khanjan%20Thakkar/OneDrive/Desktop/awdf/frontend/src/pages/DoctorsPage.jsx)): Fetches data asynchronously from `GET /api/v1/doctors` inside `useEffect()` on component mount.
- **Three Explicit States**: Manages `data`, `loading`, and `error` states to seamlessly display loading indicators, error fallback alerts, or doctor cards (Name, Specialisation, Availability).
