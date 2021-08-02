const DislikedMovie = require('../models/disliked_movies.cjs')
const session = require('express-session');

exports.showDislikes = (req, res) => {

    var user_id = req.session.userId;
    
    if(req.session.loggedin){
        DislikedMovie.getAll(user_id, (err, data) => {
            if(data == 'no dislikes'){
                var dis = []
                res.render('dislikes', {
                    dislikes: false,
                    user: req.session.username,
                    data: dis
                })
            }
            else{
                
                var dis = []
                for(let i = 0; i < data.length; i++){
                    dis.push(data[i].movie_id)
                }
                res.render('dislikes', {
                    dislikes: true,
                    data: dis,
                    user: req.session.username
                })
            }
        });
    } else {
        res.redirect('/users/login')
    }   

}

exports.deleteDislike = (req, res) => {
    var movie_id = req.body.movie_id;
    var user_id = req.session.userId;

    DislikedMovie.deleteDis(movie_id, user_id, (err, data) => {
        if(err){
            console.log(err);
        } else if(err == false){
            res.status(200).json({
                status: 'success',
                message: 'ok' 
            });
        }
    })
}