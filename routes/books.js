const router = require('express').Router();
const BookModel = require('../models/books');

// POSTing data to our database
router.post('/books', async (req, res) => {
    try {
        let newBookModel = BookModel(req.body)
        const dataToSave = await newBookModel.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Retrieve all data
router.get('/books', async (req, res) => {
    try {
        const data = await BookModel.find({});
        res.json(data);
    } catch (error) {
        res.status(500).json({messsage: error.message});
    }
});

// Retrieve data by ID
router.get('/books/:id', async (req, res) => {
    try {
        const data = await BookModel.findById(req.params.id);
        res.json(data);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

// Update record by ID
router.patch('/books/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedBody = req.body;
        const options = { new: true };
        const result = await BookModel.findByIdAndUpdate(id, updatedBody, options);
        res.send(result);
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete by ID
router.delete('/books/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await BookModel.findByIdAndDelete(id);
        res.send(`Document with ${data} has been deleted...`);
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;