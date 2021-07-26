const mysql = require('./mysql.cjs');
dislikedMovie = function(){}

dislikedMovie.getAll = (user, result) => {
    
    if(user){
        mysql.query('SELECT * FROM movie_dislikes WHERE user_id = ?', user, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if(res.length == 0){
                result(null, "no dislikes");
                return;
            }
            else{
                result(null, res);
            }
        
        })
    }
}

dislikedMovie.getUsers = (movie_ids, user_id, result) => {
    
    console.log(movie_ids);
    mysql.query('SELECT user_id FROM movie_dislikes WHERE movie_id IN (' 
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

module.exports = dislikedMovie;