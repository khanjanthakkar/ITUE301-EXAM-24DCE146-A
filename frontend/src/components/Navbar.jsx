import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand">
          <div className="brand-icon">🏥</div>
          <span>MedCare <span className="brand-highlight">Plus</span></span>
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end
            >
              🏠 Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/doctors" 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              👨‍⚕️ Doctors
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/booking" 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              📅 Book Appointment
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
