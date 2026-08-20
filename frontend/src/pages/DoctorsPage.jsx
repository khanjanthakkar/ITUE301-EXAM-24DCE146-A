import React, { useState, useEffect } from 'react';

const DoctorsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/v1/doctors');

        if (!response.ok) {
          throw new Error(`Server Error (${response.status}): Failed to load doctors list.`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Fetch doctors error:', err);
        setError(err.message || 'Unable to connect to doctors service API.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="container page-container">
      <div className="page-header">
        <h1 className="page-title">Medical Specialists</h1>
        <p className="page-subtitle">
          Our team of experienced and certified healthcare professionals
        </p>
      </div>

      {loading && (
        <div className="state-container">
          <div className="spinner"></div>
          <p style={{ color: 'var(--text-muted)' }}>Loading specialists from API...</p>
        </div>
      )}

      {error && !loading && (
        <div className="error-alert">
          <h3>⚠️ API Fetch Error</h3>
          <p>{error}</p>
          <button 
            className="btn-primary" 
            style={{ width: 'auto', marginTop: '1rem', padding: '0.5rem 1rem' }}
            onClick={() => window.location.reload()}
          >
            Retry API Request
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid-cards">
          {data.map((doctor) => (
            <div key={doctor.id || doctor.email} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className={doctor.available ? 'badge-available' : 'badge-unavailable'}>
                    {doctor.available ? '● Available Today' : '○ Unavailable'}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>ID: #{doctor.id}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.2rem' }}>
                  {doctor.name}
                </h3>

                <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.95rem' }}>
                  🩺 {doctor.specialisation}
                </p>
              </div>

              <div style={{ paddingTop: '0.8rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span>📧 {doctor.email}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
