const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
// dsfasdfas afsd
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));


// Dashboard
router.get('/snake', (req, res) =>
  res.render('snake', {
    user: req.user,
    category: req.category
  })
);

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;
