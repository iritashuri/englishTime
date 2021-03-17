const express = require('express');
const router = express.Router();
const passport = require('passport');


const { ensureAuthenticated } = require('../config/auth');

// Load User  and Word model
const User = require('../models/User');
const Word = require('../models/Word');

router.post('/cards', ensureAuthenticated, (req, res, next) =>
    res.render('cards', {
        user: req.user,
        category: req.body.category
    })
);


router.get('/cards', ensureAuthenticated, (req, res, next) =>
    res.render('cards', {
        user: req.user,
        category: req.body.category
    })
);
module.exports = router;
