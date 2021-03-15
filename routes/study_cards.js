const express = require('express');
const router = express.Router();

// Load User model
const User = require('../models/User');
const Word = require('../models/Word');
//const { forwardAuthenticated } = require('../config/auth');

router.get('/study_cards', (req, res) => {

    Word.find({ "level": "A1", "catagory":"personality" }, (err, words) => {
        const wordsList = []
        words.forEach(word => { wordsList.push(word); });
        word = wordsList[1]

        res.render('study_cards',{
            word : word['word'],
            translation: word['translation']
        })
    });


    
})



module.exports = router;
