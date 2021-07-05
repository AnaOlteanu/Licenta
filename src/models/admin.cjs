const mysql = require('./mysql.cjs');

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
        console.log("created admin: ", { id: res.insertId, ...newAdmin });
        result(null, { id: res.insertId, ...newAdmin });
    })
}

module.exports = Admin;