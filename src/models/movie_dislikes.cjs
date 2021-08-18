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

dislikeMovie.getNumberDislikes = (movie_id, result) => {
    mysql.query("SELECT COUNT(*) AS count FROM movie_dislikes WHERE movie_id = ?", movie_id, (err, res) =>{
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


dislikeMovie.getAll = (user, result) => {
    
    if(user){
        mysql.query('SELECT * FROM movie_dislikes WHERE user_id = ?', user, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if(res.length == 0){
                result(true, "no dislikes");
                return;
            }
            else{
                result(false, res);
            }
        
        })
    }
}

dislikeMovie.getUsers = (movie_ids, user_id, result) => {
   

    mysql.query('SELECT * FROM movie_dislikes WHERE movie_id IN ( ' + movie_ids.join() + ') AND user_id != ?', 
                         user_id, (err, res) => {
        
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
        }
    })

}

dislikeMovie.getDifferentDislikedMovies = (movie_ids, user_id, k_users, result) => {

    mysql.query('SELECT * FROM movie_dislikes WHERE movie_id NOT IN ( ' + movie_ids.join() + ') AND user_id != ? AND user_id IN ( ' + k_users.join() + ')', 
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

dislikeMovie.deleteDis = (movie_id, user_id, result) => {
    mysql.query("DELETE FROM movie_dislikes WHERE movie_id = ? AND user_id = ?", [movie_id, user_id], (err, res) => {
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



module.exports = dislikeMovie;