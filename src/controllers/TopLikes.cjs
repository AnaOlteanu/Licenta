const MovieLike = require('../models/movie_likes.cjs')
const session = require('express-session');


exports.getTop10 = (req, res) => {

    MovieLike.getTopLikedMovies((err, data) => {
        if(err){
            console.log(err);
        }
        if(req.session.username == undefined){
            req.session.username = "";
        }
        if(data == 'no data found' && !err){
            res.render('top-likes', {
                status: 'error',
                top: [],
                user: req.session.username
            })
        } else if(data.length > 0 && err == null){
            var top10 = [];
            for(let i = 0; i < data.length; i++){
                var ob = {
                    movie_id: data[i].movie_id,
                    nr_likes: data[i].c    
                };
                top10.push(ob);
            }
            console.log(top10);
            res.render('top-likes', {
                status: 'ok',
                top: top10,
                user: req.session.username
            })
        }
    })
}

exports.getTopMovieLikes = (req, res) => {
    if(req.session.loggedin){
        res.render('top-details' , { 
            isLoggedIn: true,
            user: req.session.username
        })
    }
    else{
        res.render('top-details',{
            isLoggedIn: false,
            user: req.session.username
        })
    }
}