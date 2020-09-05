const nodemailer = require("nodemailer");
//step1
// we need a transporter that will connect us to the mail.

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});


//step 2 
//fill the details for the user
let mailOpt = {
    from: 'kunalsnodemailer@gmail.com',
    to: 'kunalssendernodemailer@gmail.com',
    subject: 'Reset password on LoaND',
    text: ' http://localhost:4200/ If you have not requested for reset password, let us know. This may be an attempt to hack into your account or it may just be your family member or friend'
};


//step3
//send the data.

transporter.sendMail(mailOpt, (err, data) => {
    if (err) {
        console.log("Cannot send email");
    }
});