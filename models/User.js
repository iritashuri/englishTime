const mongoose = require('mongoose');
const Word = require('./Word');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    words: {
        type: Map,
        of: Array,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;