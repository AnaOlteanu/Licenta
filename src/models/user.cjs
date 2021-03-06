const mysql = require('./mysql.cjs');
const bcrypt = require('bcrypt');

const User = function(user){
    this.username = user.username;
    this.password = user.password;
    this.is_active = 'N';
}

User.getAll = result => {
    mysql.query('SELECT * FROM users', (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        
        result(null, res);
    })
}

User.create = (newUser, result) => {
    mysql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            result(err, null);
            return;
          }
        result(null, { id: res.insertId, ...newUser });
    })
}

User.login = (user, result) => {

    mysql.query("SELECT * FROM users WHERE username = ?", user.username, async (err, res) => {

        if(res.length == 0){
            console.log('no result')
            result(null, 'no result');
            return;
        }
        try{
            console.log('Userul este: ' + user.username)
            if(await bcrypt.compare(user.password, res[0].password)){
                console.log('Success')
                result(null, res)
            }
            else{
                console.log('Access denied')
                result(err,'denied')
                return;
            }
        }catch(e){
            console.log(e)
        }
    })
}
 
User.checkIfExists = (username, result) => {
    
    mysql.query("SELECT * FROM users WHERE username = ? " , username , (err, res) => {
    
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

User.getUserByUsername = (username, result) => {
    mysql.query("SELECT id FROM users WHERE username = ?", username, (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        if(res.length > 0){
            result(false, res[0].id);
            return;
        } else {
            result(false, 'no data found');
            return;
        }
    })
}


module.exports = User;