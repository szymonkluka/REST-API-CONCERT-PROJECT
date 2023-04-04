const express = require('express');
const router = express.Router();
const db = require('./db');

const { concerts } = require('./db');

// get all concerts
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

// get random concert
router.route('/concerts/random').get((req, res) => {
  const randomConcert = concerts[Math.floor(Math.random() * concerts.length)];
  res.json(randomConcert);
});


// get concert by its id
router.route('/concerts/:id').get((req, res) => {
  const matchingConcert = concerts.find(concert => concert.id === req.params.id)
  if (matchingConcert) {
    res.json(matchingConcert);
  }
  else {
    res.status(404).sendStatus("Concerts not found");
  }
})


// modify concert by its id
router.route('/concerts/:id').put((req, res) => {
  const newConcert = {
    author: 'John Doe',
    text: 'This company is everything you need !'
  };
  db.concerts.push(newConcert);
  res.json({ message: 'OK' });
});


// add concerts
router.route('/concerts').post((req, res) => {
  const newConcert = {
    author: 'John Doe',
    text: 'This company is worth every coin!'
  };
  db.concerts.push(newConcert)
  res.json({ message: 'OK' });
});


// delete concert by its id
router.route('/concerts/:id').delete((req, res) => {
  const index = concerts.findIndex((element) => element.id == req.params.id);

  if (index != -1) {
    concerts.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

module.exports = router;
