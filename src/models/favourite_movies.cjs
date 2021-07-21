const mysql = require('./mysql.cjs');
favouriteMovie = function(){
}

favouriteMovie.getAll = (user, result) => {
    mysql.query('SELECT * FROM movie_likes WHERE user_id = ?', user, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.length == 0){
            result(null, "no favourites");
            return;
        }
        else{
            result(null, res);
        }
    
    })
}


module.exports = favouriteMovie;