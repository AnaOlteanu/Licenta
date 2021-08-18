const Admin = require('../models/admin.cjs');
const User = require('../models/user.cjs');
const Quote = require('../models/quote.cjs');
const bcrypt = require('bcrypt');
const express = require('express');
const session = require('express-session');
const { Validator } = require('node-input-validator');
const sendEMail = require('../mail-send/mail.cjs');


const adminApp = express();
adminApp.use(session({
    secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


exports.getAdmins = (req, res) => {
    Admin.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
        });
    else res.send(data);
    })
}

exports.createAdmin = async (req, res) => {

    const v_user = new Validator(req.body,
        { 
            username: 'regex:^[A-Z][a-zA-Z0-9]*$'
        })

    const v_pass = new Validator(req.body, 
        {
            password: 'minLength:5'
        })

    const {username, password, role} = req.body;

    if (!req.body.username|| !req.body.password) {
        res.render('admins-add', {
            message: 'Plase fill in all the fields!'
        })
    }

    v_user.check().then((matched) => {
        if(!matched){
            res.render('admins-add', {
                message: 'Username should start with capital letter!'
            })
        } else{
            v_pass.check().then(async (matched) => {
                if(!matched){
                    res.render('admins-add', {
                        message: 'Password should have minimum 5 characters!'
                    })
                } else {
                    try{
                        await Admin.checkIfExists(username, async (err, data) => {
                            if(!err && data == 'nu exista'){
                                const salt = await bcrypt.genSalt()
                                const hashedPassword = await bcrypt.hash(password, salt);
                                const admin = new Admin({username: username, password: hashedPassword, role: 1});
                                Admin.create(admin, (err, data) => {
                                    if (err)
                                        res.render('admins-add', {
                                            message: err.message || "Some error occurred while creating the Admin."
                                        })
                                    else {
                                        res.render('admins-login', {
                                            message: '',
                                            admin: req.session.admin
                                        });
                                    }
                                })
                            }
                            else if(!err && data == 'exista'){
                                res.render('admins-add', {
                                    message: "Admin exists already!"
                                })
                            } 
                            else if(err){
                                res.render('admins-add', {
                                    message: 'Some error occured with the database!'
                                })
                            }  
                        })
                    }catch(e){
                        console.log(e);
                    }
                }
            })
        }
    })


}

exports.loginAdmin = (req, res) => {

    const v = new Validator(req.body,
        { 
            username: 'regex:^[A-Z][a-zA-Z0-9]*$'
        }
    )

    const {username, password} = req.body;
    
    if(!username || !password){
        return res.render('admins-login', {
            message: "Please provide an username and a password!",
            admin: req.session.admin
            });
    }

    v.check().then((matched) => {
        if(!matched){
            return res.render('admins-login', {
                message: 'The username should start with capital letter',
                admin: req.session.admin
            })
        } else {
            const admin = new Admin({username: username, password: password});
            Admin.login(admin, (err, data) => {
                if (data == 'denied' || data == 'no result'){
                    return res.render('admins-login', {
                        message: 'Username or password incorrect!',
                        admin: req.session.admin
                    })
                }
                else if(err){
                    return res.render('admins-login', {
                        message: err.message || "Some error occurred while login the Admin.",
                        admin: req.session.admin
                    })
                }
                else {
                    req.session.admin = data[0].username;
                    req.session.loggedin = false;
                    req.session.adminId = data[0].id;
                    req.session.adminLoggedIn = true;
                    res.redirect('/admins/home');
                }
            })
        }
    })


}

exports.logoutAdmin = (req, res) => {
    // req.session.admin = '';
    // req.session.adminLoggedIn = false;
    // req.session.loggedin = false;
    // req.session.adminId = '';
    req.session.destroy();
    res.redirect('/');
}

exports.getHomePage = (req, res) => {

    if(req.session.adminLoggedIn){
        User.getAll((err, data) => {
            if(err){
                res.render('admins-home', {
                    admin: req.session.admin,
                    admin_id: req.session.adminId,
                    users: []
                })
            } else {
                var users = []
                for(let i = 0; i < data.length; i++){
                    users.push(data[i].username);
                }
                res.render('admins-home', {
                    admin: req.session.admin,
                    admin_id: req.session.adminId,
                    users: users
                })
            }
        });
    }
    else{
        res.redirect('/admins/info')
    }

    
    
}

exports.warnUser = (req, res) => {
    var username = req.query.username;
    sendEMail(username, data => {
        if(data == 'success'){
            res.status(200).json({
                status: 'success'
            });
        } else {
            res.status(200).json({
                status: 'error'
            });
        }
    });
}

exports.deleteUser = (req, res) => {
    var username = req.body.username;
    Admin.deleteUser(username, (err, data) => {
        if(err){
            res.status(200).json({
                status: 'error'
            });
        } else {
            res.status(200).json({
                status: 'success'
            });
        }
    })
}

exports.setQuote = (req, res) => {
    var admin_id = req.body.admin_id;
    var quote = req.body.quote;

    const newQuote = new Quote({
        admin_id: admin_id,
        quote: quote
    })
    
    Quote.addQuote(newQuote, (err, data) => {

    })
    
}
