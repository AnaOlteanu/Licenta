const express = require('express');
const router = express.Router();

const movieLikesController = require('../controllers/MovieLikes.cjs');

router.post('/likeMovie', movieLikesController.addMovieLike);

module.exports = router;
