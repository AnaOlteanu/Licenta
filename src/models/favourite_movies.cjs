const mysql = require('./mysql.cjs');
favouriteMovie = function(){}

favouriteMovie.getAll = (user, result) => {

    if(user){
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
}

favouriteMovie.getUsers = (movie_ids, user_id, result) => {

    console.log(movie_ids);
    mysql.query('SELECT * FROM movie_likes WHERE movie_id IN (' 
                        + movie_ids.join() + ') AND user_id != ?', user_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.length == 0){
            result(null, "no data found");
            return;
        }
        else{
            result(null, res);
        }
    })

}

module.exports = favouriteMovie;