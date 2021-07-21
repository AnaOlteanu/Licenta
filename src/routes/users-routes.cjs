const express = require('express');
const session = require('express-session')
const router = express.Router();

const userController = require('../controllers/Users.cjs');


router.get('/users/register', (req, res) => {
    res.render('register', {
        message: '',
        user: req.session.username
    });
  
})
router.post('/users/register', userController.registerUser);

router.get('/users/login', (req, res) => {
  res.render('login', {message: ''})
})
router.post('/users/login', userController.loginUser);

router.get('/users/logout', userController.logoutUser);

module.exports = router;
