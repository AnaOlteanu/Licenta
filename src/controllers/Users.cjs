const User = require('../models/user.cjs')
const FavouriteMovies = require('../models/favourite_movies.cjs')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const session = require('express-session');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');

var schema = new passwordValidator();
schema.is().min(3);

const userApp = express();
userApp.use(session({
    secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


exports.registerUser = async (req, res) => {
    const {username, password} = req.body;
    if (!req.body.username|| !req.body.password) {
        return res.render('register', {
            message: "Please provide an username and a password!"
            });
    }
    else if(emailValidator.validate(username) == false){
        res.render('register', {
            message: "Please provide a correct email address!"
        })
    }
    else if(schema.validate(password) == false){
        res.render('register', {
            message: "Please provide a minimum 3 character password!"
        })
    }
    else{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({username: username, password: hashedPassword});
        User.create(user, (err, data) => {
            if (err)
            res.render('register', {
                message: "Some error occurred while creating the user."
            })
            else {
                res.redirect('/users/login');
            }
        })
    }

}

exports.loginUser = (req, res) => {

    const {username, password} = req.body;

    if(!username || !password){
        return res.render('login', {
            message: "Please provide an username and a password!"
            });
    }
    else if(emailValidator.validate(username) == false){
        res.render('login', {
            message: "Please provide a correct email address!"
        })
    }
    else if(schema.validate(password) == false){
        res.render('login', {
            message: "Please provide a minimum 3 character password!"
        })
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
    req.session.loggedin = false;
    req.session.username = '';
    res.redirect('/home');
}

exports.profileUser = (req, res) => {

    const user_id = req.session.userId;
    
    FavouriteMovies.getAll(user_id, (err, data) => {
        if(data == 'no favourites'){
            var fav = []
            res.render('profile', {
                favourites: false,
                user: req.session.username,
                data: fav
            })
        }
        else{
            
            var fav = []
            for(let i = 0; i < data.length; i++){
                fav.push(data[i].movie_id)
            }
            res.render('profile', {
                favourites: true,
                data: fav,
                user: req.session.username
            })
        }
    });
}