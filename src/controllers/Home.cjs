const Quote = require('../models/quote.cjs')

exports.getHomePage = (req, res) => {
    if(req.session.loggedin){

        Quote.getQuote((err,data) => {
            if(err){
                console.log(err);
                return;
            }
            var quote = data[0].quote;
            res.render('home' , { 
                user: req.session.username,
                isLoggedIn: true,
                quote: quote
            })
        })

    }
    else{
        res.render('home',{
            user: '',
            isLoggedIn: false,
            quote: ''
        })
    }
}


