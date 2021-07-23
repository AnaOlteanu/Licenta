const mysql = require('./mysql.cjs');

const likeMovie = function(likeMovie){
    this.movie_id = likeMovie.movie_id;
    this.user_id = likeMovie.user_id;
}

likeMovie.add = (newLikeMovie, result) => {

    mysql.query("INSERT INTO movie_likes SET ?", newLikeMovie, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, 'success');
    });    
};

likeMovie.checkIfExists = (newLikeMovie, result) => {

    mysql.query("SELECT * FROM movie_likes WHERE user_id = ? AND movie_id = ? ", 
        [newLikeMovie.user_id, newLikeMovie.movie_id], (err, res) => {

        if(res.length > 0){
            result(true, false);
            return;
        }
        else if(res.length == 0){
            result(false, true);
            return;
        }
    });
};

module.exports = likeMovie;