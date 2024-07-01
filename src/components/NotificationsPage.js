import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaUser, FaBell, FaEnvelope, FaCog, FaCalendarAlt, FaAddressBook } from 'react-icons/fa';
import Logout from './Logout';
import '../styles/NotificationsPage.css';

const NotificationsPage = ({ userData, course }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock notifications for demonstration purposes
    const mockNotifications = [
      { id: 1, message: 'Please upload a profile picture to attract more connections.', timestamp: new Date() },
      { id: 2, message: 'Your meeting with the mentor is scheduled for tomorrow.', timestamp: new Date() },
    ];
    setNotifications(mockNotifications);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getHomeLink = () => {
    if (!userData) return "/";
    const { degreeProgram } = userData;
    if (degreeProgram.toLowerCase().includes('bachelor')) {
      return `/bachelor/${course}`;
    } else if (degreeProgram.toLowerCase().includes('master')) {
      return `/master/${course}`;
    }
    return "/";
  };

  return (
    <div className="notifications-page">
      <div className="top-nav">
        <div className="welcome-message">
          {/* Displaying welcome message with user data */}
          {userData && (
            <div className="notification-message">
              {userData.profile_picture ? (
                <span>No new notifications</span>
              ) : (
                <span>1 new message: Please upload a profile picture to attract more connections.</span>
              )}
            </div>
          )}
        </div>
        <div className="nav-icons">
          {/* Update the home link */}
          <Link to={getHomeLink()} className="nav-icon"><FaHome /></Link>
          <Link to="/my-profile" className="nav-icon"><FaUser /></Link>
          <Link to="/notifications" className="nav-icon"><FaBell /></Link>
          <Link to="/messages" className="nav-icon"><FaEnvelope /></Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars className="bars-icon" />
        </div>
      </div>
      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/settings"><FaCog className="nav-icon" /> Settings</Link></li>
          <li><Link to="/dashboard"><FaAddressBook className="nav-icon" /> Dashboard</Link></li>
          <li><Link to="/calendar"><FaCalendarAlt className="nav-icon" /> Calendar</Link></li>
          <li><Logout /></li>
        </ul>
      </nav>
      <div className="notifications-container">
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item">
            <p>{notification.message}</p>
            <span className="timestamp">{new Date(notification.timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;

