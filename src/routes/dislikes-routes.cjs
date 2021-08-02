const express = require('express');
const session = require('express-session')
const router = express.Router();

const dislikedMovieController = require('../controllers/DislikedMovies.cjs');

router.get('/dislikes', dislikedMovieController.showDislikes);

router.get('/detailsDis', (req, res) => {
    if(req.session.loggedin){
        res.render('dislikes-details' , { 
            isLoggedIn: true,
            user: req.session.username
        })
    }
    else{
        res.redirect('/users/login');
    }
})

router.delete('/removeDislike', dislikedMovieController.deleteDislike);

module.exports = router;
