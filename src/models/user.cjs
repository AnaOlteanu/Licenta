const mysql = require('./mysql.cjs');

const User = function(user){
    this.username = user.username;
    this.password = user.password;
}

User.getAll = result => {
    mysql.query('SELECT * FROM users', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    })
}

User.create = (newUser, result) => {
    mysql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    })
}

module.exports = Admin;