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
    date: {
        type: Date,
        default: Date.now
    },
    words: {
        type: Map,
        // of: Array,
        default: {
            a1: [],
            a2: []
        }
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;