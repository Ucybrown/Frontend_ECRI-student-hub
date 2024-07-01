import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarPage.css'; // Create this CSS file to style the calendar

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-page">
      <h2>Calendar</h2>
      <Calendar
        onChange={setDate}
        value={date}
      />
      <div className="selected-date">
        <h3>Selected Date:</h3>
        <p>{date.toDateString()}</p>
      </div>
    </div>
  );
};

export default CalendarPage;
