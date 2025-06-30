import React, { useState } from 'react';

export default function Controls({ onBook, onRandom, onReset }) {
  const [count, setCount] = useState(1);

  return (
    <div style={{ marginBottom: 20 }}>
      <label>
        Number of rooms (1-5):{' '}
        <input
          type="number"
          min="1"
          max="5"
          value={count}
          onChange={e => setCount(parseInt(e.target.value, 10))}
        />
      </label>
      {' '}
      <button onClick={() => onBook(count)}>Book</button>
      {' '}
      <button onClick={onRandom}>Generate Random</button>
      {' '}
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
