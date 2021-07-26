const DislikedMovies = require('../models/disliked_movies.cjs')
const FavouriteMovies = require('../models/favourite_movies.cjs')
const session = require('express-session');

exports.getRecommendations = async (req, res) => {
    
    var user_id = req.session.userId;

    var matrix = [];
    var matrix = [];
    
    var nr_movies = 0;

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

                nr_movies = favourite_movies.length + disliked_movies.length;

                if(nr_movies != 0){
                    for(let i = 0; i <= nr_movies ; i++) {
                        matrix[i] = new Array(nr_movies + 1).fill(0);
                    }
                    matrix[0][0] = undefined;
                    matrix[1][0] = user_id;
                    for(let i = 1; i <= nr_movies; i++){
                        matrix[0][i] = all_movies_user[i-1];
                    }

                    for(let i = 1; i <= favourite_movies.length; i++){
                        matrix[1][i] = 1;
                    }

                    for(let i = favourite_movies.length + 1; i <= nr_movies; i++){
                        matrix[1][i] = 0;
                    }
                    
                    console.table(matrix);

                    var other_users = []
                    
                    await DislikedMovies.getUsers(all_movies_user, user_id, async (err, data) => {
                        console.log('DISLIKES');
                        console.log(data);
                        
                        if(data.length > 0){
                            for(let i = 0; i < data.length; i++){
                                other_users.push(data[i].user_id);
                            }
                        }

                        await FavouriteMovies.getUsers(all_movies_user, user_id, (err, data) => {
                            console.log('LIKES');
                            console.log(data);
                        })
                        
                    })
                    
                }


            })
        })
    }
    catch(e){
        console.log(e);
    }
}

function getOtherUsers(movie_ids, user_id){
    
}