const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    dateOfPublication: {
        required: true,
        type: Date
    },
    chapters: {
        required: true,
        type: [String]
    },
    price: {
        required: true,
        type: mongoose.Types.Decimal128
    },
    image: {
        type: Buffer,
        default: null
    }
});

module.exports = mongoose.model('book', bookSchema)