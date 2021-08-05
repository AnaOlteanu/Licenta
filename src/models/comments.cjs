const mysql = require('./mysql.cjs');

const comment = function(newComment){
    this.comment_text = newComment.comment_text;
    this.date = newComment.date;
    this.movie_id = newComment.movie_id;
    this.user_id = newComment.user_id;
}

comment.insertComment = (newComment, result) => {

    mysql.query("INSERT INTO comments SET ?" , newComment, (err, res) => {
        
        if(err){
            result(err, null);
            return;
        }
        else if(res){
            result(false, 'success');
        }
        else{ 
            result(false, 'fail');
        }
    })
}

comment.getCommentsByMovieId = (movie_id, result) => {

    mysql.query("SELECT c.comment_text, c.date, u.username FROM comments c JOIN users u ON(u.id = c.user_id) WHERE movie_id = ? ORDER BY c.id DESC", 
                    movie_id, (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        else if(res.length > 0){
            result(false, res);
        }
        else{ 
            result(false, 'no data found');
        }
    })
}

comment.getCountComm = (movie_id, result) => {

    mysql.query("SELECT COUNT(comment_text) count FROM comments WHERE movie_id = ?", movie_id, (err, res) => {
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

module.exports = comment;