const mysql = require('./mysql.cjs');

const Quote = function(newQuote){
    this.admin_id = newQuote.admin_id;
    this.quote = newQuote.quote;
}

Quote.addQuote = (newQuote, result) => {
    console.log(newQuote);
    mysql.query("INSERT INTO quotes SET ?", newQuote, (err,res) => {
        
        if (err) {
            result(err, null);
            return;
        }
        result(null, 'success');
    } )
}

Quote.getQuote = result => {

    mysql.query("SELECT quote FROM quotes ORDER BY id DESC LIMIT 1", (err, res) => {
        if(err){
            result(err, null);
            return;
        } else if(res.length > 0){
            result(null, res);
            return;
        }
        result(null, 'no data found');
    })
}

module.exports = Quote;
