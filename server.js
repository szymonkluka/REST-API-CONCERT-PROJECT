const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extends: false }));
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.json());

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

/*
// get all testimonials
router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
  });
*/

  /*
  // get random testimonial
  router.route('/testimonials/random').get((req, res) => {
    const randomTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
    res.json(randomTestimonial);
  });
  */
  
  /*
  // get testimonial by its id
  router.route('/testimonials/:id').get((req, res) => {
    const matchingTestimonial = testimonials.find(testimonial => testimonial.id === req.params.id)
    if (matchingTestimonial) {
      res.json(matchingTestimonial);
    }
    else {
      res.status(404).sendStatus("Testimonial not found");
    }
  })
  */
  
  /*
  // modify testimonial by its id
  router.route('/testimonials/:id').put((req, res) => {
    const newTestimonial = {
      author: 'John Doe',
      text: 'This company is worth every coin!'
    };
    db.testimonials.push(newTestimonial);
    res.json({ message: 'OK' });
  });
  */

  /*
  // add testimonial
  router.route('/testimonials').post((req, res) => {
    const newTestimonial = {
      author: 'John Doe',
      text: 'This company is worth every coin!'
    };
    db.testimonials.push(newTestimonial)
    res.json({ message: 'OK' });
  });
  */
  
  // delete testimonial by its id
  /*router.route('/testimonials/:id').delete((req, res) => {
    const index = testimonials.findIndex((element) => element.id == req.params.id);
  
    if (index != -1) {
      testimonials.splice(index, 1);
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  }); */