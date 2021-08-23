const express = require('express');
const router = express.Router();

const adminController = require('../controllers/Admins.cjs');


router.get('/admins/create-admin', (req, res) => {
    console.log(req.session.adminLoggedIn)
    if(req.session.adminLoggedIn){ 
      res.render('admins-add', {
        message: '',
        user: req.session.username
      })
    }
    else{
        res.render('admins-error', {
          user: req.session.username
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

router.get('/admins/home', adminController.getHomePage);

router.get('/admins/info', (req, res) => {
  res.render('admins-error', {
              user: req.session.username
            })
  }
)

router.delete('/admins/deleteUser', adminController.deleteUser);

router.post('/admins/setQuote', adminController.setQuote);

router.get('/admins/warnUser', adminController.warnUser);

module.exports = router;
