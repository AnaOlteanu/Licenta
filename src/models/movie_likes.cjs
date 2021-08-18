const mysql = require('./mysql.cjs');

const likeMovie = function(likeMovie){
    this.movie_id = likeMovie.movie_id;
    this.user_id = likeMovie.user_id;
}

likeMovie.add = (newLikeMovie, result) => {

    mysql.query("INSERT INTO movie_likes SET ?", newLikeMovie, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, 'success');
    });    
};

likeMovie.checkIfExists = (newLikeMovie, result) => {

    mysql.query("SELECT * FROM movie_likes WHERE user_id = ? AND movie_id = ? ", 
        [newLikeMovie.user_id, newLikeMovie.movie_id], (err, res) => {
        
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

likeMovie.getNumberLikes = (movie_id, result) => {
    mysql.query("SELECT COUNT(*) AS count FROM movie_likes WHERE movie_id = ?", movie_id, (err, res) =>{
        if(err){
            result(err, null);
            return;
        }
        if(res.length > 0){
            result(false, res[0].count);
            return;
        }
    })
}

likeMovie.getTopLikedMovies = (result) => {
    mysql.query("SELECT COUNT(user_id) c, movie_id FROM movie_likes GROUP By movie_id ORDER BY c DESC LIMIT 10", (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        if(res.length > 0){
            result(null, res);
            return;
        }
        else{
            result(false, 'no data found');
            return;
        }
    })
}


likeMovie.getAll = (user, result) => {

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

likeMovie.getUsers = (movie_ids, user_id, result) => {
    
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

likeMovie.getDifferentLikedMovies = (movie_ids, user_id, k_users, result) => {

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

likeMovie.deleteFav = (movie_id, user_id, result) => {
    mysql.query("DELETE FROM movie_likes WHERE movie_id = ? AND user_id = ?", [movie_id, user_id], (err, res) => {
   
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

module.exports = likeMovie;