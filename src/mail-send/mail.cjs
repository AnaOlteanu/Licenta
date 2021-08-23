
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

let mailTransporter = nodemailer.createTransport({
    service: process.env.SERVICE_ENV,
    auth: {
        user: process.env.EMAIL_ENV,
        pass: process.env.PASSWORD_ENV
    },
    tls: {
        rejectUnauthorized: false
    }
});
  


const sendEMail = (email, result) => {

    let mailDetails = {
        from: process.env.EMAIL_ENV,
        to: email,
        subject: 'Your Movies4U account will be deleted',
        text: "Hello! We want to inform you that your account will be deleted due to unappropriate behaviour. Thank you for your understanding!"
    };
  

   mailTransporter.sendMail(mailDetails, function(err, info) {
    if(err) {
        console.log('Error Occurs');
        console.log(err);
        result('error');
    } else {
        console.log('Email sent successfully at ' + email);
        console.log(info.response);
        result('success');
    }
     });
}


module.exports = sendEMail;