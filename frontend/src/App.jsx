import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import BookingPage from './pages/BookingPage';

function App() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'Aksh',
      doctorName: 'Dr. Khanjan',
      date: '2026-08-25',
      timeSlot: '10:00 AM',
      status: 'confirmed',
      reason: 'Routine Heart Checkup'
    },
    {
      id: 2,
      patientName: 'Kalp',
      doctorName: 'Dr. Yug',
      date: '2026-08-26',
      timeSlot: '02:30 PM',
      status: 'pending',
      reason: 'Frequent Migraines'
    },
    {
      id: 3,
      patientName: 'Priyanshu',
      doctorName: 'Dr. Dhruv',
      date: '2026-08-22',
      timeSlot: '11:15 AM',
      status: 'cancelled',
      reason: 'Knee Pain Consultation'
    }
  ]);

  const fetchAppointments = () => {
    fetch('/api/v1/appointments')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Fetch failed');
      })
      .then((data) => setAppointments(data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAddAppointment = (newAppt) => {
    setAppointments((prev) => [...prev, newAppt]);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage appointments={appointments} refreshAppointments={fetchAppointments} />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/booking" element={<BookingPage onAddAppointment={handleAddAppointment} refreshAppointments={fetchAppointments} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
