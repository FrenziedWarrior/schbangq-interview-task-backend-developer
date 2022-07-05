const router = require('express').Router();
const Model = require('../models/books');

// POSTing data to our database
router.post('/books', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Retrieve all data
router.get('/books', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({messsage: error.message});
    }
});

// Retrieve data by ID
router.get('/books/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
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
        const result = await Model.findByIdAndUpdate(id, updatedBody, options);
        res.send(result);
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete by ID
router.delete('/books/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with ${data} has been deleted...`);
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;