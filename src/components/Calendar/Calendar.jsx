import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import './calendar.css';



// Skapa en ny React-komponent för kalendern
function CalendarComponent() {
  // Skapa en state-variabel för det valda datumet som användaren väljer i kalendern
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Skapa en state-variabel för datan för det valda datumet
  const [selectedData, setSelectedData] = useState({});

  // Skapa en funktion som hämtar datan för det valda datumet från "calendarData.json"
  function fetchSelectedData(date) {
    // Läs in data från "calendarData.json"
    fetch('./data/calendarData.json')
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
     
 

   
 

        // Hitta händelsen som matchar det valda datumet
        const event = data.events.find((event) => event.date === date.toISOString().slice(0, 10));
        setSelectedData(event || {});
      })
      .catch((error) => console.error(error));
  }

  // Skapa en funktion som hanterar användarens val av datum i kalendern
  function handleDateChange(date) {
    setSelectedDate(date);
    fetchSelectedData(date);
  }

  // Rendera kalendern och visa det valda datumet och datan för valt datum
  return (
    <div>
      <h1>Ortodox kalender</h1>
      <p>Valt datum: {selectedDate.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      <Calendar value={selectedDate} onChange={handleDateChange} />
      {selectedData && (
        <div>
          <h3>{selectedData.title}</h3>
          <p>{selectedData.description}</p>
        </div>
      )}
    </div>
  );
}

export default CalendarComponent;
