const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controllers')

// get all concerts
router.get('/concerts', ConcertController.getAllConcerts);

// get random concert
router.get('/concerts/random', ConcertController.getRandomConcert);

// get concert by its id
router.get('/concerts/:id', ConcertController.getConcertById);

// post concert
router.post('/concerts', ConcertController.postConcert);

// modify concert by its id
router.put('/concerts/:id', ConcertController.modifyConcert);

// delete concert by its id
router.delete('/concerts/:id', ConcertController.deleteConcert);

module.exports = router;
