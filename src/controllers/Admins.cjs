const Admin = require('../models/admin.cjs')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

    const {username, password, role} = req.body;
    if (!req.body.username|| !req.body.password|| !req.body.role) {
        res.render('admins-add', {
            message: 'Plase fill in all the fields!'
        })
    }
    else{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt);
        const admin = new Admin({username: username, password: hashedPassword, role: role});
        Admin.create(admin, (err, data) => {
            if (err)
            res.render('admins-add', {
                message: err.message || "Some error occurred while creating the Admin."
            })
            else {
                res.redirect('/home');
            }
        })
    }

}

exports.loginAdmin = (req, res) => {

  
    const {username, password} = req.body;

    if(!username || !password){
        return res.render('admins-login', {
            message: "Please provide an username and a password!"
            });
    }
    const admin = new Admin({username: username, password: password});
    Admin.login(admin, (err, data) => {

        if (data == 'denied' || data == 'no result'){
            return res.render('admins-login', {
                message: 'Username or password incorrect!'
            })
        }
        else if(err){
            return res.render('login', {
                message: err.message || "Some error occurred while login the Admin."
            })
        }
        else {
            res.redirect('/home');
        }
    })

}