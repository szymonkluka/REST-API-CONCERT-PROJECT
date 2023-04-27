const Concert = require('../models/concert.model');

// get all concerts
exports.getAllConcerts = async (req, res) => {
    try {
        const concerts = await Concert.find();
        res.json(concerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get random concert
exports.getRandomConcert = async (req, res) => {

    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const concert = await Concert.findOne().skip(rand);
        if (!concert) res.status(404).json({ message: 'Not found' });
        else res.json(concert);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

// get concert by its id
exports.getConcertById = async (req, res) => {

    try {
        const dep = await Concert.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

// post concert
exports.postConcert = async (req, res) => {
    try {
        const { performer, genre, price, image, day, id } = req.body;
        const newConcert = new Concert({
            id: id,
            performer: performer,
            genre: genre,
            price: price,
            day: day,
            image: image
        });
        await newConcert.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// modify concert by its id
exports.modifyConcert = async (req, res) => {
    const { performer, genre, price, image, day, id } = req.body;

    try {
        const concertId = await Concert.findById(req.params.id);
        if (concertId) {
            await Concert.updateOne({ _id: req.params.id }, {
                $set: {
                    id: id,
                    performer: performer,
                    genre: genre,
                    price: price,
                    day: day,
                    image: image
                }
            });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

// delete concert by its id
exports.deleteConcert = async (req, res) => {
    try {
        const concertId = await Concert.findById(req.params.id);
        if (concertId) {
            await Concert.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};