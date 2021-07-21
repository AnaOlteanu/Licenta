const FavouriteMovie = require('../models/favourite_movies.cjs')
const session = require('express-session');

exports.showFavourites = (req, res) => {
    var user_id = req.session.userId;
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

}