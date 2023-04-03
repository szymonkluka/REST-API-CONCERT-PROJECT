const express = require('express');
const router = express.Router();
const db = require('./db');

const { seats } = require('./db');

// get all seats
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

// get random seat
router.route('/seats/random').get((req, res) => {
  const randomSeats = seats[Math.floor(Math.random() * seats.length)];
  res.json(randomSeats);
});

// get seat by its id
router.route('/seats/:id').get((req, res) => {
  const matchingSeats = seats.find(seat => seat.id === req.params.id)
  if (matchingSeats) {
    res.json(matchingSeats);
  }
  else {
    res.status(404).sendStatus("Seats not found");
  }
})

// modify seat by its id
router.route('/seats/:id').put((req, res) => {
  const newSeat = {
    author: 'John Doe',
    text: 'This company is worth every coin! Join us to find out more !'
  };
  db.seats.push(newSeat);
  res.json({ message: 'OK' });
});


// add seat by its id
router.route('/seats').post((req, res) => {
  const newSeat = {
    author: 'John Doe',
    text: 'This company is worth every coin!'
  };
  db.seats.push(newSeat)
  res.json({ message: 'OK' });
});


// delete seat by its id
router.route('/seats/:id').delete((req, res) => {
  const index = seats.findIndex((element) => element.id == req.params.id);

  if (index != -1) {
    seats.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

module.exports = router;
