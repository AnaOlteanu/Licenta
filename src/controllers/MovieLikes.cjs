const MovieLike = require('../models/movie_likes.cjs')
const session = require('express-session');

exports.addMovieLike = (req, res) => {
    var movie_id = req.body.movie_id;
    var user_id = req.session.userId;
    
    const movie_like = new MovieLike({
        movie_id: movie_id, 
        user_id: user_id
    });
    MovieLike.add(movie_like, (err, data) => {
        if(data == 'already liked'){
            // req.session.already_liked = true;
            // res.redirect('/details')
            res.render('', );
        }
    })
}

