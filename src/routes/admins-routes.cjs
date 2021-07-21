const express = require('express');
const session = require('express-session')
const router = express.Router();

const adminController = require('../controllers/Admins.cjs');


router.get('/admins/create-admin', (req, res) => {
  console.log(req.session.username)
  if(req.session.loggedin){ 
    res.render('admins-add', {
      message: '',
      user: req.session.username
    })
  }
  else{
      //res.send('Please login to view this page')
      res.render('admins-error', {
        user: ''
      })
  }
  
})
router.post('/admins/create-admin', adminController.createAdmin);

router.get('/admins/login', (req, res) => {
  res.render('admins-login', {
    message: '',
    user: req.session.username
  })
})
router.post('/admins/login', adminController.loginAdmin);

router.get('/admins/logout', adminController.logoutAdmin);

module.exports = router;
