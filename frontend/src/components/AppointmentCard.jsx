import React from 'react';

const AppointmentCard = ({ patientName, doctorName, date, timeSlot, status }) => {
  const getStatusClass = (statusValue) => {
    switch (statusValue?.toLowerCase()) {
      case 'confirmed':
        return 'status-badge status-confirmed';
      case 'cancelled':
        return 'status-badge status-cancelled';
      case 'pending':
      default:
        return 'status-badge status-pending';
    }
  };

  return (
    <div className="glass-card appointment-card">
      <div className="appointment-header">
        <div>
          <h3 className="patient-name">{patientName}</h3>
          <p className="doctor-assigned">👨‍⚕️ {doctorName}</p>
        </div>
        <span className={getStatusClass(status)}>
          {status}
        </span>
      </div>

      <div className="appointment-meta">
        <div className="meta-item">
          <span>📅</span>
          <span>{date}</span>
        </div>
        <div className="meta-item">
          <span>⏰</span>
          <span>{timeSlot}</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
