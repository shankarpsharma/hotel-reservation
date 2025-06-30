const express = require('express');
const cors = require('cors');
const roomsRouter = require('./routes/rooms');

const app = express();

// Allow all origins for development (or restrict as needed)
app.use(cors());
  
  // Explicitly handle OPTIONS requests
//   app.options('*', cors());

app.use(express.json());
app.use('/rooms', roomsRouter);

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Server error');
//   });
  
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log('Server running on port', PORT);
  });
