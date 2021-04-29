const express = require('express');
const router = express.Router();
const passport = require('passport');

const { ensureAuthenticated } = require('../config/auth');

// Load User  and Word model
const User = require('../models/User');
const Word = require('../models/Word');

// Study cards
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

// Snake game
router.post('/snake', ensureAuthenticated, (req, res, next) =>
    res.render('snake', {
        user: req.user,
        category: req.body.category
    })
);


router.get('/snake', ensureAuthenticated, (req, res, next) =>
    res.render('snake', {
        user: req.user,
        category: req.body.category
    })
);

// Cards game
router.post('/card-game', ensureAuthenticated, (req, res, next) =>
    res.render('card-game', {
        user: req.user,
        category: req.body.category
    })
);


router.get('/card-game', ensureAuthenticated, (req, res, next) =>
    res.render('card-game', {
        user: req.user,
        category: req.body.category
    })
);

router.post('/todos', ensureAuthenticated, (req, res, next) => {
    //console.log((req.body));
    var current_user = req.body;
    var myquery = { email: current_user.email };

    //console.log(typeof user);

    var newvalues = { $set: { words: current_user.words } };

    User.updateOne(myquery, newvalues).then((obj) => {
        console.log('Updated - ' + JSON.stringify(obj));
        res.redirect('orders')
    })
        .catch((err) => {
            console.log('Error: ' + err);
        })
}
);


// Settings
router.post('/settings', ensureAuthenticated, (req, res, next) =>
    res.render('settings', {
        user: req.user,
    })
);
module.exports = router;
