const homeController = require('../controllers/Home.cjs')
const express = require('express');
const session = require('express-session')
const router = express.Router();

router.get('/home', homeController.getHomePage)

module.exports = router;