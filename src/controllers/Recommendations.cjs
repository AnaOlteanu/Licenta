const DislikedMovies = require('../models/disliked_movies.cjs')
const FavouriteMovies = require('../models/favourite_movies.cjs')
const session = require('express-session');

exports.getRecommendations = async (req, res) => {
    
    var user_id = req.session.userId;

    var matrix = [];
    var matrix = [];
    
    var no_movies = 0;

    var favourite_movies = []
    var disliked_movies = []
    all_movies_user = []

    try{
        await FavouriteMovies.getAll(user_id, async (err, data) => {
            if(data == 'no favourites'){
                
            }
            else{
                for(let i = 0; i < data.length; i++){
                    favourite_movies.push(data[i].movie_id);
                    all_movies_user.push(data[i].movie_id);
                }
                
            }

            await DislikedMovies.getAll(user_id, async (err, data) => {
                if(data == 'no disliked'){
                }
                else{
                    for(let i = 0; i < data.length; i++){
                        disliked_movies.push(data[i].movie_id);
                        all_movies_user.push(data[i].movie_id);
                    }
                }

                no_movies = favourite_movies.length + disliked_movies.length;

                if(no_movies != 0){
                    for(var i = 0; i < no_movies; i++) {
                        matrix[i] = new Array(no_movies);
                    }

                    for(let i = 0; i < favourite_movies.length; i++){
                        matrix[0][i] = 1;
                    }

                    for(let i = favourite_movies.length; i < no_movies; i++){
                        matrix[0][i] = 0;
                    }

                    
                    await DislikedMovies.getUsers(all_movies_user, user_id, (err, data) => {
                        console.log(data);
                    })
                }


            })
        })
    }
    catch(e){
        console.log(e);
    }
}