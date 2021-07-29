const MovieLike = require('../models/movie_likes.cjs')
const session = require('express-session');

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

