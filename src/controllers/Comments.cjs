const Comment = require('../models/comments.cjs')
const User = require('../models/user.cjs');
const session = require('express-session');


exports.addComment = async (req, res) => {

    const movie_id = req.body.movie_id;
    const username = req.body.username;
    const comment_text = req.body.comment;
    const today = new Date();
    
    
    await User.getUserByUsername(username, (err, data) => {
        if(err){
            console.log(err);
        } else if(!err && data !== "no data found"){
            const user_id = data;
            const newComment = new Comment({
                comment_text: comment_text,
                date: today,
                movie_id: movie_id,
                user_id: user_id
            })

            Comment.insertComment(newComment, (err, data) => {
                if(err){
                    console.log(err);
                }
                console.log(data);
                if(data === 'success'){
                    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-'+ today.getFullYear() ;
                    res.status(200).json({
                        status: 'success',
                        comment: comment_text,
                        date: date,
                        username: username,
                        movie_id: movie_id
                    });
                }
                else{
                    res.status(200).json({
                        status: 'fail',
                        comment: "",
                        date: "",
                        username: "",
                        movie_id: ""
                    });
                }
            })
        } else {
            console.log(data);
        }
    })
}

exports.getComments = async (req, res) => {
    var movie_id = req.query.movie_id;

    await Comment.getCommentsByMovieId(movie_id, async (err, data) => {
        if(err){
            console.log(err);
        } else if(!err && data !== 'no data found'){
            
            var comments = [];
            for(let i = 0; i < data.length; i++){
                var date = data[i].date;
                var date_formatted = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
                var ob = {
                    comment: data[i].comment_text,
                    date: date_formatted,
                    username: data[i].username
                }
                comments.push(ob);
            }
            // console.log(comments);

            res.status(200).json({
                status: 'success',
                comments: comments
            });
        } else {
            res.status(200).json({
                status: 'fail',
                comments: []
            });
        }
    })
    
}
