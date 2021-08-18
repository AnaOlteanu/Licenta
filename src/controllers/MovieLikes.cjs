const MovieLike = require('../models/movie_likes.cjs')

exports.addMovieLike = async (req, res) => {
    var movie_id = req.body.movie_id;
    var user_id = req.session.userId;
    
    const movie_like = new MovieLike({
        movie_id: movie_id, 
        user_id: user_id
    });

    let alreadyExists = false;
    try {
        await MovieLike.checkIfExists(movie_like, async (err, data) => {
            if (err === true) {
                alreadyExists = true;
            }
            if (alreadyExists === false && user_id) {
                MovieLike.add(movie_like, (err, data) => {
                    if(data === 'success'){
                        res.status(200).json({
                            status: 'success',
                            message: 'Movie added to list' 
                        });
                    }
                });
            } else {
                res.status(200).json({
                    status: 'error',
                    message: 'You already liked this movie' 
                });
            }
        });
    } catch (e) {
       return res.status(400).json({ status: 400, message: e.message });
    }
}


exports.getLikeButton = async (req, res) => {

    var movie_id = req.query.movie_id;
    if(req.session.loggedin){
        MovieLike.checkIfExists({ movie_id: movie_id, user_id: req.session.userId}, (err, data) => {
            if(err == true){
                res.status(200).json({
                    status: 'error',
                    message: 'You already liked this movie' 
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'ok' 
                });
            }
        })
    }

}

exports.getCountLikes = (req, res) => {
    var movie_id = req.query.movie_id;
    
    MovieLike.getNumberLikes(movie_id, (err, data) => {
        if(err == false){
            res.status(200).json({
                status: 'success',
                number: data
            });
        }
    })
}

exports.showFavourites = (req, res) => {

    var user_id = req.session.userId;
    
    if(req.session.loggedin){
        MovieLike.getAll(user_id, (err, data) => {
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

    MovieLike.deleteFav(movie_id, user_id, (err, data) => {
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

