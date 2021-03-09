const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    }
});

const Word = mongoose.model('Word', WordSchema);

module.exports = Word;