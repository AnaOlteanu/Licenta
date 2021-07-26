const DislikedMovie = require('../models/disliked_movies.cjs')
const session = require('express-session');

exports.showDislikes = (req, res) => {

    var user_id = req.session.userId;
    
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

}