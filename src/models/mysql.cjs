const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "ana",
    password: "-F8!/Eek!l6Qdvb(",
    database: "imdb"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });

module.exports = con;
