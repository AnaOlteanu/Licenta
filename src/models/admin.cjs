const mysql = require('./mysql.cjs');
const bcrypt = require('bcrypt');

const Admin = function(admin){
    this.username = admin.username;
    this.password = admin.password;
    this.role = admin.role;
    this.is_active = 'N';
}

Admin.getAll = result => {
    mysql.query('SELECT * FROM admins', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        console.log("admins: ", res);
        result(null, res);
    })
}

Admin.create = (newAdmin, result) => {
    mysql.query("INSERT INTO admins SET ?", newAdmin, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
        console.log("created admin: ", newAdmin);
        result(null, newAdmin);
    })
}

Admin.login = (admin, result) => {

    mysql.query("SELECT * FROM admins WHERE username = ?", admin.username, async (err, res) => {

        if(res.length == 0){
            console.log('no result')
            result(null, 'no result');
            return;
        }

        try{
            
            console.log('Adminul este: ' + admin.username)
            if(await bcrypt.compare(admin.password, res[0].password)){
                console.log('Success')
                result(null, res)
            }
            else{
                console.log('Access denied')
                result(err,'denied')
                return;
            }
        }catch{
            //res.status(500).send()
        }
    })
}

Admin.checkIfExists = (username, result) => {
    mysql.query("SELECT * FROM admins WHERE username = ? " , username , (err, res) => {
    
        if(err){
            result(err, null);
            return;
        }
        if(res.length > 0){
            result(null, 'exista');
            return;
        }
        else if(res.length == 0){
            result(null, 'nu exista');
            return;
        }
    });
}

Admin.deleteUser = (username, result) => {
    console.log(username);
    mysql.query("DELETE FROM users WHERE username = ?", username, (err, res) => {
        if(err){
            result(err, null);
            return;
        } else{
            result(null, res);
            return;
        }
    })
}

module.exports = Admin;