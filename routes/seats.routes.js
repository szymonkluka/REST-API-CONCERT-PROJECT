const express = require('express');
const router = express.Router();
const db = require('./db');

const { seats, concerts } = require('./db');

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
  const id = req.params.id;
  const seat = db.seats.find(seat => seat.id == id);
  if (!seat) {
    return res.status(404).json({ message: 'seat not found' })
  }
  else {
    seat.author = req.body.author;
    seat.text = req.body.text;
    res.json({ message: 'OK' });
  }
});

router.route('/seats').post((req, res) => {
  const day = req.body.day;
  const seat = req.body.seat;

  // Check if the seat is already occupied
  const isOccupied = db.seats.some((s) => s.day === day && s.seat === seat);
  if (isOccupied) {
    // Return a response with status code 409 (Conflict) and the message "The slot is already taken..."
    return res.status(409).json({ message: 'The slot is already taken...' });
  }

  // If the seat is not occupied, add the new seat to the seats array in the db object
  const newSeat = {
    id: db.seats.length + 1,
    day: day,
    seat: seat,
    client: req.body.client,
    email: req.body.email,
  };
  db.seats.push(newSeat);

  // Return a response with status code 201 (Created) and the message "OK"
  res.status(201).json({ message: 'OK' });
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
