const Quote = require('../models/quote.cjs')
const session = require('express-session');

exports.getHomePage = (req, res) => {

    if(req.session.loggedin){

        Quote.getQuote((err,data) => {
            if(err){
                console.log(err);
                return;
            }
            if(data.length > 0){
                var quote = data[0].quote;
                res.render('home' , { 
                    user: req.session.username,
                    isLoggedIn: true,
                    quote: quote
                })
            }
            else if(data == 'no data found'){
                res.render('home' , { 
                    user: req.session.username,
                    isLoggedIn: true,
                    quote: ''
                })
            }
        })

    }
    else if(!req.session.loggedin && !req.session.adminLoggedIn){
        res.render('home',{
            user: "",
            isLoggedIn: false,
            quote: ""
        })
    }
    else if(req.session.adminLoggedIn){
        res.render('home', {
            user: '',
            isLoggedIn: '',
            quote: ''
        });
    }
}


