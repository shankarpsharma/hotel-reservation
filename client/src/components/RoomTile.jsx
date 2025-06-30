import React from 'react';

export default function RoomTile({ number, status, isBooked }) {
  let bg = '#eee';
  if (status === 'occupied') bg = '#f88';
  else if (isBooked) bg = '#8f8';
  return (
    <div style={{
      width: 36, height: 36, margin: 2, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontFamily: 'monospace', border: '1px solid #ccc'
    }}>
      {number % 1000}
    </div>
  );
}
