// send an Email from NODEJS Server using nodemailer module
//This tutorial will show you how to use your Gmail account to send an email:

var nodejsmailer = require('nodemailer'); // use mailer nodejs module

var mailOptions = {
    from: 'q88884536@gmail.com',
    to: 'sanidhya.sharma720@gmail.com',
    subject: "Sending Email to Rajat",
    text: "Welcome to NodeMailer, It's Working",
    html: '<h1>Welcome</h1><p>That was easy!</p>',
    
}    // details of to send from, to,  subject, text(message),


var transporter = nodejsmailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'q88884536@gmail.com',
        pass: 'ynbzawiqmgczehzu'      // note: always keep password in .env file to keep it hidden
    }
}); // initialize create Transport service

//sends the mail
transporter.sendMail(mailOptions, function (error, info) {

    if (error) {
        console.log(error);
    } else {
        console.log('Email Send ' + info.response);
    }
});