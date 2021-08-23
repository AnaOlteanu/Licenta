const User = require('../models/user.cjs')
const FavouriteMovies = require('../models/movie_likes.cjs')
const DislikedMovies = require('../models/movie_dislikes.cjs')
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');

var schema = new passwordValidator();
schema.is().min(4)
        .has().digits(2);



exports.registerUser = async (req, res) => {

    const {username, password} = req.body;
    if (!req.body.username|| !req.body.password) {
        return res.render('register', {
            message: "Please provide an username and a password!",
            user: req.session.username
            });
    }
    
    try{
        await User.checkIfExists(username, async (err, data) => {
            
            if(!err && data == 'nu exista'){
                if(emailValidator.validate(username) == false){
                    res.render('register', {
                        message: "Please provide a correct email address!",
                        user: req.session.username
                    })
                } else if(schema.validate(password) == false){
                    var failed = schema.validate(password, {list: true});
                   
                    for(let i = 0; i < failed.length; i++){
                        if(failed[i] == 'min'){
                            res.render('register', {
                                message: "Please provide a minimum 4 character password!",
                                user: req.session.username
                            })
                            break;
                        } 
                        if(failed[i] == 'digits'){
                            res.render('register', {
                                message: req.flash("Please provide a password with minimum 2 digits!"),
                                user: req.session.username
                            })
                        }
                    }
                    
                } else {
                    const salt = await bcrypt.genSalt()
                    const hashedPassword = await bcrypt.hash(password, salt);
                    const user = new User({username: username, password: hashedPassword});
                    await User.create(user, (err, data) => {
                        if (err)
                        res.render('register', {
                            message: "Some error occurred while creating the user.",
                            user: req.session.username
                        })
                        else {
                           
                            res.redirect('/users/login');
                        }
                    })
                }
            }
            else if(!err && data == 'exista'){
                res.render('register', {
                    message: 'Username already exists!',
                    user: req.session.username
                })
            } 
            else if(err){
                res.render('register', {
                    message: 'Some error occured with the database!',
                    user: req.session.username
                })
            }
        })

    } catch(e){
        console.log(e);
    }
    

}

exports.loginUser = (req, res) => {

    const {username, password} = req.body;

    if(!username || !password){
        return res.render('login', {
            message: "Please provide an username and a password!"
            });
    }

    else{
        const user = new User({username: username, password: password});

        User.login(user, (err, data) => {
            if (data == 'denied' || data == 'no result'){
                return res.render('login', {
                    message: 'Username or password incorrect!'
                })
            }
            else if(err){
                return res.render('login', {
                    message: "Some error occurred while login the User."
                })
            }
            else {
                req.session.loggedin = true;
                req.session.username = data[0].username;
                req.session.userId = data[0].id;
                res.redirect('/home');
            }
        })
    }

}

exports.logoutUser = (req, res) => {
    req.session.destroy();
    res.redirect('/home');
}

exports.profileUser = (req, res) => {

    const user_id = req.session.userId;

    if(req.session.loggedin){

        FavouriteMovies.getAll(user_id, (err, data) => {
            if(data == 'no favourites'){
                var fav = []
                DislikedMovies.getAll(user_id, (err, data) => {
                    if(err == true){
                        var dis = []
                        res.render('profile', {
                            dislikes: false,
                            favourites: false,
                            user: req.session.username,
                            data_d: dis,
                            data_f: fav
                        })
                    }
                    else{
                        
                        var dis = []
                        for(let i = 0; i < data.length; i++){
                            dis.push(data[i].movie_id)
                        }
                        res.render('profile', {
                            dislikes: true,
                            favourite: false,
                            data_d: dis,
                            data_f: fav,
                            user: req.session.username
                        })
                    }
                });
                
            }
            else{   
                
                var fav = []
                for(let i = 0; i < data.length; i++){
                    fav.push(data[i].movie_id)
                }
                DislikedMovies.getAll(user_id, (err, data) => {
                    if(data == 'no dislikes'){
                        var dis = []
                        res.render('profile', {
                            dislikes: false,
                            favourites: true,
                            user: req.session.username,
                            data_d: dis,
                            data_f: fav
                        })
                    }
                    else{
                        
                        var dis = []
                        for(let i = 0; i < data.length; i++){
                            dis.push(data[i].movie_id)
                        }
                        res.render('profile', {
                            dislikes: true,
                            favourite: true,
                            data_d: dis,
                            data_f: fav,
                            user: req.session.username
                        })
                    }
                })
            }
        });
    } else {
        res.redirect('/users/login');
    }

    
}