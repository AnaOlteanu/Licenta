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
            console.log('already exists ' + alreadyExists);

            if (alreadyExists === false && user_id) {
                console.log('IS NOT HERE');
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

