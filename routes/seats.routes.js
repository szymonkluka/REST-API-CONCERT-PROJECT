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
  const matchingSeat = seats.find(seat => seat.id === parseInt(req.params.id));
  if (matchingSeat) {
    res.json(matchingSeat);
  }
  res.status(404).json({ message: 'Seat not found' });

});

// modify seat by its id

router.route('/seats/:id').put((req, res) => {
  const id = req.params.id;
  const { day, seat, client, email } = req.body;

  const index = seats.findIndex((seat) => seat.id == id);

  if (index !== -1) {
    seats[index] = {
      ...seats[index],
      day: day || seats[index].day,
      seat: seat || seats[index].seat,
      client: client || seats[index].client,
      email: email || seats[index].email,
    };
    res.json({ message: `Seat ${id} updated successfully.` });
  }
  res.status(404).json({ message: `Seat ${id} not found.` });
  return;

});

router.route('/seats').post((req, res) => {
  const newSeat = {
    id: Math.floor(Math.random() * 100000),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };
  db.seats.push(newSeat);
  res.status(201).json({ message: 'OK' });
});


// delete seat by its id
router.route('/seats/:id').delete((req, res) => {
  const index = seats.findIndex((element) => element.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found...' });
  }

  seats.splice(index, 1);
  res.json({ message: 'OK' });
});

router.use((req, res) => {
  res.status(404).json({ message: 'Element not found' });
});

module.exports = router;
