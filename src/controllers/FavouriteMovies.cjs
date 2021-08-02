const FavouriteMovie = require('../models/favourite_movies.cjs')
const session = require('express-session');

exports.showFavourites = (req, res) => {

    var user_id = req.session.userId;
    
    if(req.session.loggedin){
        FavouriteMovie.getAll(user_id, (err, data) => {
            if(data == 'no favourites'){
                var fav = []
                res.render('favourites', {
                    favourites: false,
                    user: req.session.username,
                    data: fav
                })
            }
            else{
                
                var fav = []
                for(let i = 0; i < data.length; i++){
                    fav.push(data[i].movie_id)
                }
                res.render('favourites', {
                    favourites: true,
                    data: fav,
                    user: req.session.username
                })
            }
        });
    } else {
        res.redirect('/users/login');
    }

}

exports.deleteFavourite = (req, res) => {
    var movie_id = req.body.movie_id;
    var user_id = req.session.userId;

    FavouriteMovie.deleteFav(movie_id, user_id, (err, data) => {
        if(err){
            console.log(err);
        } else if(err == false){
            res.status(200).json({
                status: 'success',
                message: 'ok' 
            });
        }
    })
}