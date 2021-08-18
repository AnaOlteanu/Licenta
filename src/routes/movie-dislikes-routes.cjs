const express = require('express');
const router = express.Router();

const movieDislikesController = require('../controllers/MovieDislikes.cjs');

router.post('/dislikeMovie', movieDislikesController.addMovieDislike);

router.get('/getDislikeButton', movieDislikesController.getDislikeButton);

router.get('/getCountDislikes', movieDislikesController.getCountDislikes);


router.get('/dislikes', movieDislikesController.showDislikes);

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

router.delete('/removeDislike', movieDislikesController.deleteDislike);

module.exports = router;
