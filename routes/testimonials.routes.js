const express = require('express');
const router = express.Router();
const db = require('./db');
const { testimonials } = require('./db');

// get all testimonials
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

// get random testimonial
router.route('/testimonials/random').get((req, res) => {
  const randomTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
  res.json(randomTestimonial);
});

// get testimonial by its id
router.route('/testimonials/:id').get((req, res) => {
  const matchingTestimonial = testimonials.find(testimonial => testimonial.id === parseInt(req.params.id))
  if (matchingTestimonial) {
    res.json(matchingTestimonial);
  }
  res.status(404).json({ message: 'Testimonial not found' });
})

// modify testimonial by its id

router.route('/testimonials/:id').put((req, res) => {
  const id = req.params.id;
  const { author, text } = req.body;
  const index = testimonials.findIndex((testimonial) => testimonial.id === parseInt(req.params.id));

  if (index !== -1) {
    db.testimonials[index] = {
      ...testimonials[index],
      author: author || testimonials[index].author,
      text: text || testimonials[index].text,
    };
    res.json({ message: `Testimonial ${id} updated successfully.` });
  }
  res.status(404).json({ message: 'Testimonial not found' });

});

router.route('/testimonials').post((req, res) => {
  const newTestimonial = {
    id: Math.floor(Math.random() * 100000),
    author: req.body.author,
    text: req.body.text
  };
  db.testimonials.push(newTestimonial)
  res.status(201).json({ message: 'OK' });
});

// delete testimonial by its id
router.route('/testimonials/:id').delete((req, res) => {
  const index = testimonials.findIndex((element) => element.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found...' });
  }

  testimonials.splice(index, 1);
  res.json({ message: 'OK' });
});


module.exports = router;
