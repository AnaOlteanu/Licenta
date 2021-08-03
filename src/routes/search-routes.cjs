const express = require('express');
const session = require('express-session')
const router = express.Router();


router.get('/searchedMovies', (req, res) => {
    if(req.session.loggedin){
        res.render('search' , { 
            isLoggedIn: true,
            user: req.session.username
        })
    }
    else if(!req.session.adminLoggedIn){
        res.render('search',{
            isLoggedIn: false,
            user: req.session.username
        })
    } else {
        res.render('search', {
            isLoggedIn: false,
            user: ''
        })
    }
})

router.get('/detailsSearched', (req, res) => {
    if(req.session.loggedin){
        res.render('search-details' , { 
            isLoggedIn: true,
            user: req.session.username
        })
    }
    else if(!req.session.adminLoggedIn){
        res.render('search-details',{
            isLoggedIn: false,
            user: req.session.username
        })
    } else {
        res.render('search-details', {
            isLoggedIn: false,
            user: ''
        })
    }
})

module.exports = router;