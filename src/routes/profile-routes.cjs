const express = require('express');
const session = require('express-session')
const router = express.Router();

const userController = require('../controllers/Users.cjs');

router.get('/profile', userController.profileUser);


module.exports = router;