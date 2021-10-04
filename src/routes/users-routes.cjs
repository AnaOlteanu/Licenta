const express = require('express');
const router = express.Router();

const userController = require('../controllers/Users.cjs');

let message = "";
router.get('/users/register', (req, res) => {
    res.render('register', {
        message: message,
        user: req.session.username
    });
  
})
router.post('/users/register', userController.registerUser);

router.get('/users/login', (req, res) => {
  res.render('login', {
    message: message
  })
})

router.post('/users/login', userController.loginUser);

router.get('/users/logout', userController.logoutUser);


module.exports = router;
