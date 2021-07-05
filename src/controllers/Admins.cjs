const Admin = require('../models/admin.cjs')

exports.getAdmins = (req, res) => {
    Admin.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
        });
    else res.send(data);
    })
}

exports.createAdmin = (req, res) => {

    if (req.body.username == '' || req.body.password == '' || req.body.role == '') {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    else{
        const admin = new Admin(req.body);

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