const express = require('express');
const router = express.Router();

const movieLikesController = require('../controllers/MovieLikes.cjs');

router.post('/likeMovie', movieLikesController.addMovieLike);

router.get('/getLikeButton', movieLikesController.getLikeButton);

router.get('/getCountLikes', movieLikesController.getCountLikes);

router.get('/favourites', movieLikesController.showFavourites);

router.get('/detailsFav', (req, res) => {
    if(req.session.loggedin){
        res.render('favourite-details' , { 
            isLoggedIn: true,
            user: req.session.username
        })
    }
    else{
        res.redirect('/users/login');
    }
})

router.delete('/removeFavourite', movieLikesController.deleteFavourite);

module.exports = router;
