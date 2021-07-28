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
            if(err == true){
                
            }
            else{
                for(let i = 0; i < data.length; i++){
                    favourite_movies.push(data[i].movie_id);
                    all_movies_user.push(data[i].movie_id);
                }
                
            }
            

        

            await DislikedMovies.getAll(user_id, async (err, data) => {

                if(err == false){
                    for(let i = 0; i < data.length; i++){
                        disliked_movies.push(data[i].movie_id);
                        all_movies_user.push(data[i].movie_id);
                    }
                }
                


                nr_movies = favourite_movies.length + disliked_movies.length;

                if(nr_movies != 0){
                    for(let i = 0; i < 2 ; i++) {
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
                    

                    var other_users_dislikes = [];
                    
                    await DislikedMovies.getUsers(all_movies_user, user_id, async (err, data) => {
                        
                        if(err == false){

                            var nr_other_users = 0;

                            if(data.length == 1){
                                nr_other_users = 1;
                                other_users_dislikes.push(data[0].user_id)
                            }
                            else{
                                for(let i = 0; i < data.length ; i++){
                                    nr_other_users ++;
                                    other_users_dislikes.push(data[i].user_id)
                                    while(i + 1 < data.length && data[i].user_id == data[i+1].user_id){
                                        i++;
                                    }
                                }
                                
                            }
                            
                       

                            for(let i = 0; i < other_users_dislikes.length; i++){
                                matrix[i + 2] = new Array(nr_movies + 1).fill(0);
                                matrix[i + 2][0] = other_users_dislikes[i];
                            }
                            
                        
                        }


                        await FavouriteMovies.getUsers(all_movies_user, user_id, async (err, data) => {
                            console.log(data);
                            if(err == false){
                                for(let i = 0; i < data.length; i++){
                                    let crt_other_user = data[i].user_id;
                                    let crt_other_fav = data[i].movie_id;
                                    let l = matrix.length;
                                    var flag = false;
                                    for(let j = 2; j < l; j++){
                                        if(matrix[j][0] == crt_other_user){
                                            flag = true;
                                            for(let k = 1; k < nr_movies + 1; k++){
                                                if(matrix[0][k] == crt_other_fav){
                                                    matrix[j][k] = 1;
                                                }
                                            }
                                        }
                                        
                                    }
                                    if(!flag){
                                        matrix[l] = new Array(nr_movies + 1).fill(0);
                                        matrix[l][0] = crt_other_user;
                                        
                                        for(let k = 1; k < nr_movies + 1; k++){
                                            if(matrix[0][k] == crt_other_fav){
                                                matrix[l][k] = 1;
                                            }
                                        }
                                       
                                    }
                                }
                 
                            }
                            console.table(matrix);
                                
                            var scor_similaritate = [];
                            var scor_valid = true;

                            if(matrix.length == 2){
                                scor_valid = false;
                            }
                            else{
                                for(let i = 2; i < matrix.length; i++){
                                    var nr_likeuri_comune = 0;
                                    var nr_dislikeuri_comune = 0;
                                    var nr_likeuri_diferite = 0;
                                    var nr_dislikeuri_diferite = 0
                                    for(let j = 1; j < nr_movies + 1; j++){
                                        if(matrix[1][j] == 1){
                                            if(matrix[i][j] == 1){
                                                nr_likeuri_comune ++;
                                            }
                                            else if(matrix[i][j] == 0){
                                                nr_likeuri_diferite ++;
                                            }
                                        }
                                        else if(matrix[1][j] == 0){
                                            if(matrix[i][j] == 0){
                                                nr_dislikeuri_comune ++;
                                            }
                                            else if(matrix[i][j] == 1){
                                                nr_dislikeuri_diferite ++;
                                            }
                                        }
                                        
                                    }
                                    var index_similaritate = (nr_likeuri_comune + nr_dislikeuri_comune - nr_likeuri_diferite - nr_dislikeuri_diferite)/(nr_movies); 
                                    var obj = {};
                                    obj['user_id'] = matrix[i][0];
                                    obj['scor'] = index_similaritate;
                                    scor_similaritate.push(obj);
                                    console.log(scor_similaritate);
                                }
                            }

                            if(scor_valid){
                                var nr_k_users = 1;
                                
                                if(scor_similaritate.length > 1){
                                    scor_similaritate.sort((a, b) => a.scor > b.scor)
                                    console.log("SORT ", scor_similaritate); 
                                    
                                    if(scor_similaritate.length <= 4){
                                        nr_k_users = scor_similaritate.length;
                                        
                                    }
                                    else{
                                        nr_k_users = 5;
                                    }
                                }
                                console.log("K USERS");
                                console.log(nr_k_users);
                                var fav = [];
                                var dis = [];
                                var k_users = []
                                for(let i = 0; i < nr_k_users; i++){
                                    k_users.push(scor_similaritate[i].user_id)
                                }
                                console.log(k_users);

                                await FavouriteMovies.getDifferentLikedMovies(all_movies_user, user_id, k_users, async(err, data) => {
                                    console.log(data);
                                    if(err == false){
                                        for(let j = 0; j < data.length; j++){
                                            if(!fav.includes(data[j].movie_id))
                                                fav.push(data[j].movie_id);
                                        }
                                    }
                                    console.log(fav);
                                    await DislikedMovies.getDifferentDislikedMovies(all_movies_user, user_id, k_users, async (err, data) => {
                                        console.log("DISLIKED OTHER");
                                        console.log(data);
                                        if(err == false){
                                            for(let j = 0; j < data.length; j++){
                                                if(!dis.includes(data[j].movie_id) && !fav.includes(data[j].movie_id))
                                                    dis.push(data[j].movie_id);
                                            
                                            }
                                        }
                                        console.log(dis);
                                        var recommended_movies = fav.concat(dis);
                                        console.log(recommended_movies);

                                        if(recommended_movies.length > 0){
                                            res.render('recommendations', {
                                                recommendation: true,
                                                rec_movies: recommended_movies,
                                                user: req.session.username
                                            })
                                        } else{
                                            res.render('recommendations', {
                                                recommendation: false,
                                                rec_movies: recommended_movies,
                                                user: req.session.username
                                            })
                                        } 
                                     })

                                    })

                            } else{
                                res.render('recommendations', {
                                    recommendation: false,
                                    rec_movies: [],
                                    user: req.session.username
                                })
                            }
                        })
                        
                    })
                    
                } else {
                    res.render('recommendations', {
                        recommendation: false,
                        rec_movies: [],
                        user: req.session.username
                    })
                }


            })
        })
    }
    catch(e){
        console.log(e);
    }
}