function initRooms() {
    const status = {};
    for (let f = 1; f <= 9; f++) {
      for (let r = 1; r <= 10; r++) {
        const num = f * 100 + r;
        status[num] = 'available';
      }
    }
    for (let r = 1; r <= 7; r++) {
      status[1000 + r] = 'available';
    }
    return status;
  }
  
  function travelTime(from, to) {
    const f1 = Math.floor(from / ((from >= 1000) ? 1000 : 100));
    const f2 = Math.floor(to / ((to >= 1000) ? 1000 : 100));
    const v = Math.abs(f1 - f2) * 2;
    const h = Math.abs((from % 100) - (to % 100));
    return v + h;
  }
  
  function bookRooms(status, n) {
    const avail = Object.keys(status).filter(r => status[r] === 'available').map(Number);
    if (avail.length < n) return [];
  
    // Try same-floor contiguous
    for (let f = 1; f <= 10; f++) {
      const floorRooms = avail.filter(r => Math.floor(r/((f===10)?1000:100)) === f)
                              .sort((a,b) => (a % 100) - (b % 100));
      for (let i = 0; i + n <= floorRooms.length; i++) {
        const slice = floorRooms.slice(i, i + n);
        const dist = slice[n-1] - slice[0];
        return slice;
      }
    }
  
    // Multi-floor: brute search smallest travel max-min
    let best = null, bestTime = Infinity;
    const combos = kCombinations(avail, n);
    combos.forEach(c => {
      const times = c.map(a => c.map(b => travelTime(a, b)));
      const maxTime = Math.max(...times.flat());
      if (maxTime < bestTime) {
        bestTime = maxTime;
        best = c;
      }
    });
  
    return best || [];
  }
  
  function kCombinations(arr, k) {
    if (k === 0) return [[]];
    if (arr.length < k) return [];
    const [first, ...rest] = arr;
    const combsWith = kCombinations(rest, k - 1).map(c => [first, ...c]);
    const combsWithout = kCombinations(rest, k);
    return combsWith.concat(combsWithout);
  }
  
  function randomOccupy(status) {
    const rooms = Object.keys(status).map(Number);
    const count = Math.floor(Math.random() * 20) + 10;
    const pick = [];
    while (pick.length < count) {
      const r = rooms[Math.floor(Math.random() * rooms.length)];
      if (!pick.includes(r)) pick.push(r);
    }
    const newStatus = {};
    for (const r of rooms) {
      newStatus[r] = pick.includes(r) ? 'occupied' : 'available';
    }
    return newStatus;
  }
  
  module.exports = { initRooms, bookRooms, randomOccupy };
  