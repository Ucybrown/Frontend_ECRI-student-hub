import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaBars, FaHome, FaUser, FaBell, FaEnvelope, FaCog, FaCalendarAlt, FaAddressBook, FaUserCircle, FaExclamationCircle } from 'react-icons/fa';
import DegreeWelcomeMessage from './DegreeWelcomeMessage';
import '../styles/UserProfilePage.css'; // Import CSS file

const UserProfilePage = () => {
  const { course } = useParams();
  const [userData, setUserData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('email', userData.email); // Include the email of the current user

      try {
        const response = await axios.post('https://ecristudenthub-backend.azurewebsites.net/upload-profile-picture/', formData);

        if (response.data.file_path) {
          const updatedUserData = { ...userData, profile_picture: response.data.file_path };
          setUserData(updatedUserData);
          localStorage.setItem('userData', JSON.stringify(updatedUserData));
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getHomeLink = () => {
    if (!userData) return "/";
    const { degreeProgram, courseOfStudy } = userData;
    const userCourse = course || courseOfStudy || 'default-course';
    if (degreeProgram.toLowerCase().includes('bachelor')) {
      return `/bachelor/${userCourse}`;
    } else if (degreeProgram.toLowerCase().includes('master')) {
      return `/master/${userCourse}`;
    }
    return "/";
  };

  return (
    <div className="bachelor-course-page">
      <div className="top-nav">
        <div className="welcome-message">
          {userData && <DegreeWelcomeMessage degreeProgram={userData.degreeProgram} courseOfStudy={course || userData.courseOfStudy} />}
        </div>
        <div className="nav-icons">
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
        </ul>
      </nav>

      <div className="profile-container">
        <div className="profile-picture-container">
          {userData && userData.profile_picture ? (
            <img src={`https://ecristudenthub-backend.azurewebsites.net/${userData.profile_picture}`} alt="Profile" />
          ) : (
            <>
              <FaUserCircle className="default-profile-icon" />
              <FaExclamationCircle className="warning-icon" title="Upload your profile picture" />
            </>
          )}
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button className="upload-profile-button" onClick={handleUploadClick}>Upload Profile Picture</button>

        </div>

        <table>
          <tbody>

            <tr>
              <td>Username:</td>
              <td>{userData && userData.username}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{userData && userData.email}</td>
            </tr>
            <tr>
              <td>Course of Study:</td>
              <td>{userData && userData.courseOfStudy}</td>
            </tr>
            <tr>
              <td>Degree Program:</td>
              <td>{userData && userData.degreeProgram}</td>
            </tr>
            <tr>
              <td>Semester:</td>
              <td>{userData && userData.semester}</td>
            </tr>
            <tr>
              <td>First Name:</td>
              <td>{userData && userData.firstName}</td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>{userData && userData.lastName}</td>
            </tr>
            <tr>
              <td>Matriculation Number:</td>
              <td>{userData && userData.matriculationNumber}</td>
            </tr>
          </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default UserProfilePage;
