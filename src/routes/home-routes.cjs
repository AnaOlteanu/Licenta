const homeController = require('../controllers/Home.cjs')
const express = require('express');
const session = require('express-session')
const router = express.Router();

router.get('/home', homeController.getHomePage)
// (req, res) => {
//     if(req.session.loggedin){
//         res.render('home' , { 
//             user: req.session.username,
//             isLoggedIn: true
//         })
//     }
//     else{
//         res.render('home',{
//             user: '',
//             isLoggedIn: false})
//     }
    
// })


module.exports = router;