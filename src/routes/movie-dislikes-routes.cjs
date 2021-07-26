const express = require('express');
const router = express.Router();

const movieDislikesController = require('../controllers/MovieDislikes.cjs');

router.post('/dislikeMovie', movieDislikesController.addMovieDislike);

router.get('/getDislikeButton', movieDislikesController.getDislikeButton);

module.exports = router;
