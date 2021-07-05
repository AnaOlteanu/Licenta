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
    mysql.query("SELECT * FROM admins WHERE username = ?", [admin.username], async (err, res) => {
        console.log('result')
        console.log(res);
        console.log("------------------");
        if(!res){
            console.log('no result')
            result(null, 'noresult');
            return;
        }
        try{
            
            console.log('Adminul este: ' + admin.username)
            // console.log('Parola introdusa este: ' + admin.password)
            if(await bcrypt.compare(admin.password, res[0].password)){
                console.log('Success')
                result(null, admin)
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

module.exports = Admin;