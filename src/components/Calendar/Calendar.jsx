import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment-timezone';
import 'react-calendar/dist/Calendar.css';


// import './calendar.css';

function CalendarComponent() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedData, setSelectedData] = useState({});

  function fetchSelectedData(date) {
  const selectedDate = moment.tz(date, 'Europe/Stockholm').format('YYYY-MM-DD');

  // Läs in data från "calendarData.json"
  fetch('./data/calendarData.json')
    .then((response) => response.json())
    .then((data) => {
      // Hitta händelsen som matchar det valda datumet
      const event = data.events.find((event) => event.date === selectedDate);
      setSelectedData(event || {});
    })
    .catch((error) => console.error(error));
}


  function handleDateChange(date) {
    setSelectedDate(date);
    fetchSelectedData(date);
  }

  return (
    <div>
      <h1>Ortodox kalender</h1>
      <p>Valt datum: {moment(selectedDate).tz(moment.tz.guess()).locale('sv').format('dddd D MMMM')}</p>
      <Calendar value={selectedDate} onChange={handleDateChange} />
      {selectedData && (
        <div>
          <h2>{selectedData.title}</h2>
          <p>{selectedData.description}</p>
        </div>
      )}
    </div>
  );
}

export default CalendarComponent;
