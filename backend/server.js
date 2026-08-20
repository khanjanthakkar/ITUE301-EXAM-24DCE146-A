const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.path} [${timestamp}]`);
  next();
};

app.use(requestLogger);

let doctors = [
  {
    id: 1,
    name: 'Dr. Khanjan',
    email: 'khanjan@medcare.com',
    specialisation: 'Cardiology',
    available: true
  },
  {
    id: 2,
    name: 'Dr. Yug',
    email: 'yug@medcare.com',
    specialisation: 'Neurology',
    available: true
  },
  {
    id: 3,
    name: 'Dr. Ankit',
    email: 'ankit@medcare.com',
    specialisation: 'Pediatrics',
    available: false
  },
  {
    id: 4,
    name: 'Dr. Dhruv',
    email: 'dhruv@medcare.com',
    specialisation: 'Orthopedics',
    available: true
  },
  {
    id: 5,
    name: 'Dr. Aryant',
    email: 'aryant@medcare.com',
    specialisation: 'Dermatology',
    available: true
  },
  {
    id: 6,
    name: 'Dr. Jeet',
    email: 'jeet@medcare.com',
    specialisation: 'Ophthalmology',
    available: true
  },
  {
    id: 7,
    name: 'Dr. Nishant',
    email: 'nishant@medcare.com',
    specialisation: 'General Surgery',
    available: false
  }
];

let appointments = [
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
];

app.get('/api/v1/appointments', (req, res) => {
  res.status(200).json(appointments);
});

app.post('/api/v1/appointments', (req, res, next) => {
  try {
    const { patientName, doctorName, date, timeSlot, status, reason } = req.body;

    if (!patientName || !doctorName || !date || !timeSlot) {
      return res.status(400).json({
        error: true,
        message: 'Required fields missing: patientName, doctorName, date, and timeSlot are required.'
      });
    }

    const newAppointment = {
      id: appointments.length + 1,
      patientName,
      doctorName,
      date,
      timeSlot,
      status: status || 'pending',
      reason: reason || 'N/A'
    };

    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
  } catch (err) {
    next(err);
  }
});

app.get('/api/v1/doctors', (req, res) => {
  res.status(200).json(doctors);
});

app.use((err, req, res, next) => {
  console.error('Global Error Handler caught:', err.stack || err.message);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
