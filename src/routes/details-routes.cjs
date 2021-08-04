const express = require('express');
const session = require('express-session')
const router = express.Router();

router.get('/details', (req, res) => {
    if(req.session.loggedin){
        res.render('details' , { 
            isLoggedIn: true,
            already_like: req.session.already_liked,
            user: req.session.username
        })
    }
    else{
        res.render('details',{
            isLoggedIn: false,
            already_like:  req.session.already_liked,
            user: ""
        })
    }
})

module.exports = router;