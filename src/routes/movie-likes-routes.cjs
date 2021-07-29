const express = require('express');
const router = express.Router();

const movieLikesController = require('../controllers/MovieLikes.cjs');

router.post('/likeMovie', movieLikesController.addMovieLike);

router.get('/getLikeButton', movieLikesController.getLikeButton);

router.get('/getCountLikes', movieLikesController.getCountLikes);

module.exports = router;
