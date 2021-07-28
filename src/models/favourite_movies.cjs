const mysql = require('./mysql.cjs');
favouriteMovie = function(){}

favouriteMovie.getAll = (user, result) => {

    if(user){
        mysql.query('SELECT * FROM movie_likes WHERE user_id = ?', user, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if(res.length == 0){
                result(true, "no favourites");
                return;
            }
            else{
                result(false, res);
            }
        
        })
    }
}

favouriteMovie.getUsers = (movie_ids, user_id, result) => {
    
    mysql.query('SELECT * FROM movie_likes WHERE movie_id IN ( ' + movie_ids.join() + ') AND user_id != ?', 
                user_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length == 0){
            result(true, "no data found");
            return;
        }
        else{
            result(false, res);
        }
    })

}

favouriteMovie.getDifferentLikedMovies = (movie_ids, user_id, k_users, result) => {

    mysql.query('SELECT * FROM movie_likes WHERE movie_id NOT IN ( ' + movie_ids.join() + ') AND user_id != ? AND user_id IN ( ' + k_users.join() + ' )', 
                        user_id, (err, res) =>{
        if (err) {
            result(err, null);
            return;
        }
        if(res.length == 0){
            result(true, "no data found");
            return;
        }
        else{
            result(false, res);
        };    

        });
}

favouriteMovie.deleteFav = (movie_id, user_id, result) => {
    mysql.query("DELETE FROM movie_likes WHERE movie_id = ? AND user_id = ?", [movie_id, user_id], (err, res) => {
        console.log(res);
        if(err){
            result(err, null);
            return;
        }
        else{
            result(false, 'row deleted')
            return;
        }
    })
}

module.exports = favouriteMovie;