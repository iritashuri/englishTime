const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
//const { forwardAuthenticated } = require('../config/auth');

// Login page
router.get('/login', (req, res) => res.render('login'));

// Register page
router.get('/register', (req, res) => res.render('register'));

// Register handle
router.post('/register', (req, res) => {
    const { name, email, password, password2} = req.body;
    let errors =[];

    //Check required fildes 
    if(!name || !email || !password || !password2){
        errors.push({ msg : 'אנא מלא את כל השדות' });
    }

    // Check passwords match
    if(password !== password2){
        errors.push({ msg: 'סיסמאות לא תואמות' });
    }

    // Check pass length
    if(password.length < 6) {
        errors.push({ msg: 'סיסמא חייבת לכלול לפחות 6 אותיות' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else{
        // Validation passed
        User.findOne({ email: email })
        .then(user => {
            if(user) {
                // User exist
                errors.push({msg: ' המתשמש קיים במערכת'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // Hash password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash)=> {
                    if(err) throw err;
                    // Set password to hashed
                    newUser.password = hash;
                    // Save user
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg', 'נרשמת בהצלחה , אנא התחבר');
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
                }));
            }
        });
    }
});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });

module.exports = router;