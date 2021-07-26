const mysql = require('./mysql.cjs');

const dislikeMovie = function(dislikeMovie){
    this.movie_id = dislikeMovie.movie_id;
    this.user_id = dislikeMovie.user_id;
}

dislikeMovie.add = (newDislikeMovie, result) => {

    mysql.query("INSERT INTO movie_dislikes SET ?", newDislikeMovie, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, 'success');
    });    
};

dislikeMovie.checkIfExists = (newDislikeMovie, result) => {

    mysql.query("SELECT * FROM movie_dislikes WHERE user_id = ? AND movie_id = ? ", 
        [newDislikeMovie.user_id, newDislikeMovie.movie_id], (err, res) => {

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

dislikeMovie.checkIfExistsLike = (newDislikeMovie, result) => {

    mysql.query("SELECT * FROM movie_likes WHERE user_id = ? AND movie_id = ? ", 
        [newDislikeMovie.user_id, newDislikeMovie.movie_id], (err, res) => {

        //daca exista la likes
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


module.exports = dislikeMovie;