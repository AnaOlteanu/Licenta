const express = require('express');
const session = require('express-session')
const router = express.Router();

const favouriteMovieController = require('../controllers/FavouriteMovies.cjs');

router.get('/favourites', favouriteMovieController.showFavourites);

module.exports = router;
