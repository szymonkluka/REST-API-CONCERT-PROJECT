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
  const matchingConcert = concerts.find(concert => concert.id === parseInt(req.params.id));
  if (matchingConcert) {
    res.json(matchingConcert);
  }
  res.status(404).json({ message: 'Concert not found' });
})

// modify concert by its id
router.route('/concerts/:id').put((req, res) => {
  const id = req.params.id;
  const { performer, genre, price, day, image } = req.body;

  const index = concerts.findIndex((concert) => concert.id == parseInt(id));

  if (index !== -1) {
    concerts[index] = {
      ...concerts[index],
      performer: performer || concerts[index].performer,
      genre: genre || concerts[index].genre,
      price: price || concerts[index].price,
      day: day || concerts[index].day,
      image: image || concerts[index].image,
    };
    res.json({ message: `Concert ${id} updated successfully.` });
  }
  res.status(404).json({ message: `Concert ${id} not found.` });

});

// add concerts
router.route('/concerts').post((req, res) => {
  const newConcert = {
    id: Math.floor(Math.random() * 100000),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image
  };
  db.concerts.push(newConcert);
  res.status(201).json({ message: 'OK' });
});

// delete concert by its id
router.route('/concerts/:id').delete((req, res) => {
  const index = concerts.findIndex((element) => element.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found...' });
  }
  concerts.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
