const express = require('express');
const router = express.Router();

const recommendationController = require('../controllers/Recommendations.cjs');

router.get('/recommendations', recommendationController.getRecommendations);

router.get('/detailsRec', (req, res) => {
    if(req.session.loggedin){
        res.render('recommendations-details' , { 
            isLoggedIn: true,
            user: req.session.username
        })
    }
    else{
        res.redirect('/users/login');
    }
})

module.exports = router;