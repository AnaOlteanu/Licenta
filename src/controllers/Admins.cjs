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
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    else{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt);
        const admin = new Admin({username: username, password: hashedPassword, role: role});
        Admin.create(admin, (err, data) => {
            if (err)
                res.status(500).send({
                    message:err.message || "Some error occurred while creating the Admin."
                });
            else {
                res.redirect('/home');
            }
        })
    }

}

exports.loginAdmin = (req, res) => {
    try{
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).render('login', {
                message: 'Please fill in the username and password!'
            })
        }
        const admin = new Admin({username: username, password: password});
        Admin.login(admin, (err, data) => {
            console.log('err' + err);
            if (data == 'denied' || data == 'noresult'){
                res.status(401).render('admins-login', {
                    message: 'Username or password incorrect'
                }
                )
            }
            else if(err){
                res.status(500).send({
                    message:err.message || "Some error occurred while creating the Admin."
                });
            }
            else {
                res.redirect('/home');
            }
        })

    }catch(error){
        //console.log(error)
    }
}