import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingPage = ({ onAddAppointment, refreshAppointments }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: 'Dr. Khanjan',
    date: '',
    timeSlot: '10:00 AM',
    reason: ''
  });

  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Khanjan');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === 'doctorName') {
      setSelectedDoctor(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.date) {
      alert('Please fill in required fields: Patient Name and Date.');
      return;
    }

    const newAppointment = {
      patientName: formData.patientName,
      doctorName: formData.doctorName,
      date: formData.date,
      timeSlot: formData.timeSlot,
      status: 'pending',
      reason: formData.reason || 'General Consultation'
    };

    if (onAddAppointment) {
      onAddAppointment(newAppointment);
    }

    try {
      const response = await fetch('/api/v1/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAppointment)
      });

      if (response.ok && refreshAppointments) {
        refreshAppointments();
      }
    } catch (err) {
      console.error('Error submitting appointment to backend:', err);
    }

    setSubmitMessage(`Appointment successfully booked for ${formData.patientName}! Redirecting...`);
    setTimeout(() => navigate('/'), 1200);
  };

  return (
    <div className="container page-container">
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h1 className="page-title">Book an Appointment</h1>
        <p className="page-subtitle">Schedule a consultation with our specialist doctors</p>
      </div>

      <div className="glass-card form-card">
        {submitMessage && (
          <div className="status-badge status-confirmed" style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', justifyContent: 'center' }}>
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="patientName">Patient Name *</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              className="form-input"
              placeholder="e.g. John Doe"
              value={formData.patientName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="doctorName">Doctor Name *</label>
            <select
              id="doctorName"
              name="doctorName"
              className="form-select"
              value={formData.doctorName}
              onChange={handleChange}
            >
              <option value="Dr. Khanjan">Dr. Khanjan (Cardiology)</option>
              <option value="Dr. Yug">Dr. Yug (Neurology)</option>
              <option value="Dr. Ankit">Dr. Ankit (Pediatrics)</option>
              <option value="Dr. Dhruv">Dr. Dhruv (Orthopedics)</option>
              <option value="Dr. Aryant">Dr. Aryant (Dermatology)</option>
              <option value="Dr. Jeet">Dr. Jeet (Ophthalmology)</option>
              <option value="Dr. Nishant">Dr. Nishant (General Surgery)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="date">Appointment Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="timeSlot">Time Slot *</label>
            <select
              id="timeSlot"
              name="timeSlot"
              className="form-select"
              value={formData.timeSlot}
              onChange={handleChange}
            >
              <option value="09:00 AM">09:00 AM - 09:30 AM</option>
              <option value="10:00 AM">10:00 AM - 10:30 AM</option>
              <option value="11:15 AM">11:15 AM - 11:45 AM</option>
              <option value="02:30 PM">02:30 PM - 03:00 PM</option>
              <option value="04:00 PM">04:00 PM - 04:30 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reason">Reason / Symptoms</label>
            <input
              type="text"
              id="reason"
              name="reason"
              className="form-input"
              placeholder="e.g. Routine checkup, fever"
              value={formData.reason}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-primary">
            Confirm Booking
          </button>
        </form>

        <div className="live-preview-box">
          <div className="live-preview-title">
            <span>⚡</span> Real-time State Preview
          </div>
          <p><strong>Patient Name:</strong> {formData.patientName || '(Type name above...)'}</p>
          <p><strong>Selected Doctor:</strong> {selectedDoctor}</p>
          <p><strong>Scheduled Slot:</strong> {formData.date || 'YYYY-MM-DD'} at {formData.timeSlot}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
