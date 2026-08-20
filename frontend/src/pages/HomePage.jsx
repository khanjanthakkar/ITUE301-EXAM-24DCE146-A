import React, { useEffect } from 'react';
import AppointmentCard from '../components/AppointmentCard';

const HomePage = ({ appointments, refreshAppointments }) => {
  useEffect(() => {
    if (refreshAppointments) {
      refreshAppointments();
    }
  }, []);

  return (
    <div className="container page-container">
      <div className="page-header">
        <h1 className="page-title">Hospital Appointments Dashboard</h1>
        <p className="page-subtitle">
          Manage and track upcoming patient consultations at MedCare Plus Hospital.
        </p>
      </div>

      <div className="grid-cards">
        {appointments.map((appt, idx) => (
          <AppointmentCard
            key={appt.id || idx}
            patientName={appt.patientName}
            doctorName={appt.doctorName}
            date={appt.date}
            timeSlot={appt.timeSlot}
            status={appt.status}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
