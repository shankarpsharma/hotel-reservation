import React from 'react';
import RoomTile from './RoomTile';

export default function RoomGrid({ rooms, booked }) {
  const floors = [10, ...Array.from({length:9}, (_,i)=>8-i+1)]; // 10 to 1

  return floors.map(floor => {
    const roomNums = floor === 10
      ? Array.from({ length: 7}, (_, i) => 1001 + i)
      : Array.from({ length: 10}, (_, i) => floor * 100 + (i + 1));

    return (
      <div key={floor} style={{ marginBottom: 10 }}>
        <strong>Floor {floor}</strong>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: 400 }}>
          {roomNums.map(rn => (
            <RoomTile
              key={rn}
              number={rn}
              status={rooms[rn]}
              isBooked={booked.includes(rn)}
            />
          ))}
        </div>
      </div>
    );
  });
}
