const express = require('express');
const session = require('express-session')
const router = express.Router();

const favouriteMovieController = require('../controllers/FavouriteMovies.cjs');

router.get('/favourites', favouriteMovieController.showFavourites);

router.get('/detailsFav', (req, res) => {
    if(req.session.loggedin){
        res.render('favourite-details' , { 
            isLoggedIn: true,
            user: req.session.username
        })
    }
    else{
        res.render('favourite-details',{
            isLoggedIn: false,
            user: req.session.username
        })
    }
})

router.delete('/removeFavourite', favouriteMovieController.deleteFavourite);

module.exports = router;
