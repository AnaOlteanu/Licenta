const MovieDislike = require('../models/movie_dislikes.cjs')
const session = require('express-session');

exports.addMovieDislike = async (req, res) => {
    var movie_id = req.body.movie_id;
    var user_id = req.session.userId;
    
    const movie_dislike = new MovieDislike({
        movie_id: movie_id, 
        user_id: user_id
    });

    let alreadyExists = false;
    try {
        await MovieDislike.checkIfExists(movie_dislike, async (err, data) => {
            if (err === true) {
                alreadyExists = true;
            }
            if (alreadyExists === false && user_id) {
                MovieDislike.add(movie_dislike, (err, data) => {
                    if(data === 'success'){
                        res.status(200).json({
                            status: 'success',
                            message: 'Movie added to dislike list' 
                        });
                    }
                });
            } else {
                res.status(200).json({
                    status: 'error',
                    message: 'You already disliked this movie' 
                });
            }
        });
    } catch (e) {
       return res.status(400).json({ status: 400, message: e.message });
    }
}


exports.getDislikeButton = async (req, res) => {

    var movie_id = req.query.movie_id;
    if(req.session.loggedin){
        MovieDislike.checkIfExists({ movie_id: movie_id, user_id: req.session.userId}, (err, data) => {
            if(err == true){
                res.status(200).json({
                    status: 'error',
                    message: 'You already disliked this movie' 
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


exports.getCountDislikes = (req, res) => {
    var movie_id = req.query.movie_id;
    MovieDislike.getNumberDislikes(movie_id, (err, data) => {
        if(err == false){
            res.status(200).json({
                status: 'success',
                number: data
            });
        }
    })
}



