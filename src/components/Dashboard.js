import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';  // Ensure this path is correct

const Dashboard = () => {
  const [mentorsWithMentees, setMentorsWithMentees] = useState([]);

  useEffect(() => {
    // Fetch mentors with mentees data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('/mentors-with-mentees/');
        setMentorsWithMentees(response.data);
      } catch (error) {
        console.error('Error fetching mentors with mentees data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-page">
      <h2>Mentor Dashboard</h2>
      <div>
        {mentorsWithMentees.map((mentorData, index) => (
          <div key={index} className="mentor-section">
            <h3>Mentor: {mentorData.mentor.firstName} {mentorData.mentor.lastName}</h3>
            <p>Email: {mentorData.mentor.email}</p>
            <p>Course of Study: {mentorData.mentor.courseOfStudy}</p>
            <p>Degree Program: {mentorData.mentor.degreeProgram}</p>
            <h4>Mentees:</h4>
            <ul>
              {mentorData.mentees.map((mentee, idx) => (
                <li key={idx}>
                  {mentee.firstName} {mentee.lastName} - {mentee.email}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;


