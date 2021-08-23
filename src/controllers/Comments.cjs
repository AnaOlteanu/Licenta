const Comment = require('../models/comments.cjs')
const User = require('../models/user.cjs');


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
                
                if(data === 'success'){
                    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    var date = today;
                    var month = months[date.getMonth()];
                    var date_formatted = date.getDate() + ', ' + month + ', ' + date.getFullYear();
                    var comm = {
                        comment_text: comment_text,
                        date: date_formatted,
                        username: username
                    }
                    res.status(200).json({
                        status: 'success',
                        comment: comm
        
                    });
                }
                else{
                    res.status(200).json({
                        status: 'fail',
                        comment: ""
                    
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
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            for(let i = 0; i < data.length; i++){
                var date = data[i].date;
                var month = months[date.getMonth()];
                var date_formatted = date.getDate() + ', ' + month + ', ' + date.getFullYear();
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


exports.getCountComments = (req, res) => {
    var movie_id = req.query.movie_id;

    Comment.getCountComm(movie_id, (err, data) => {
        if(err){
            console.log(err);
        } else{
            res.status(200).json({
                status: 'success',
                number: data
            });
        }
    })
}