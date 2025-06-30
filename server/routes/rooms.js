const express = require('express');
const router = express.Router();
const { initRooms, bookRooms, randomOccupy } = require('../utils/roomSelector');
let roomStatus = initRooms();

router.get('/', (req, res) => {
  res.json(roomStatus);
});

router.post('/book', (req, res) => {
  const n = req.body.count;
  const selection = bookRooms(roomStatus, n);
  selection.forEach(room => roomStatus[room] = 'booked');
  res.json({ booked: selection, status: roomStatus });
});

router.post('/generate-random', (req, res) => {
  roomStatus = randomOccupy(initRooms());
  res.json(roomStatus);
});

router.post('/reset', (req, res) => {
  roomStatus = initRooms();
  res.json(roomStatus);
});

module.exports = router;
