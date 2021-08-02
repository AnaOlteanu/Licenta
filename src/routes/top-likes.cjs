const express = require('express');
const session = require('express-session')
const router = express.Router();

const topLikesController = require('../controllers/TopLikes.cjs');

router.get('/top10', topLikesController.getTop10);

router.get('/detailsTop10', topLikesController.getTopMovieLikes);


module.exports = router;