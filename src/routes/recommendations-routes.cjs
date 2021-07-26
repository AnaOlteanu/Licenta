const express = require('express');
const router = express.Router();

const recommendationController = require('../controllers/Recommendations.cjs');

router.get('/recommendations', recommendationController.getRecommendations);


module.exports = router;