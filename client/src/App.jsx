import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Controls from './components/Controls';
import RoomGrid from './components/RoomGrid';

export default function App() {
  const [rooms, setRooms] = useState({});
  const [booked, setBooked] = useState([]);

  const fetchRooms = async () => {
    const res = await axios.get('https://hotel-reservation-c9h9.onrender.com/rooms/');
    setRooms(res.data);
    setBooked([]);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleBook = async (count) => {
    const res = await axios.post('https://hotel-reservation-c9h9.onrender.com/rooms/book', { count }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    setRooms(res.data.status);
    setBooked(res.data.booked);
  };

  const handleRandom = async () => {
    const res = await axios.post('https://hotel-reservation-c9h9.onrender.com/rooms/generate-random');
    setRooms(res.data);
    setBooked([]);
  };

  const handleReset = async () => {
    const res = await axios.post('https://hotel-reservation-c9h9.onrender.com/rooms/reset');
    setRooms(res.data);
    setBooked([]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Hotel Room Reservation</h1>
      <Controls
        onBook={handleBook}
        onRandom={handleRandom}
        onReset={handleReset}
      />
      <RoomGrid rooms={rooms} booked={booked} />
    </div>
  );
}
