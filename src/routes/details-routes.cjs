const express = require('express');
const session = require('express-session')
const router = express.Router();

const detailsController = require('../controllers/Details.cjs');

router.get('/details', detailsController.showDetails);

module.exports = router;

