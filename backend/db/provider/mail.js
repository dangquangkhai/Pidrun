const nodemailer = require("nodemailer");
const config = require("../../lib/config");
const fs = require('fs');

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(receivers, title, text, template) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    //let template_html = fs.readFileSync("../../public/template/password-reset/content.html", 'utf8');
    let transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: true, // true for 465, false for other ports
        auth: {
            user: config.email.user, // generated ethereal user
            pass: config.email.pass // generated ethereal password
        }
    });

    // send mail with defined transport object
    return await transporter.sendMail({
        from: '"Pidrun Admin Team 👻" <pidrunhcm@gmail.com>', // sender address
        to: receivers, // list of receivers
        subject: title, // Subject line
        text: text, // plain text body
        html: template // html body
    });
}

module.exports = sendMail;
// let template_html = fs.readFileSync("../../public/template/password-reset/content.html", 'utf8');
// var output = sendMail("davidarchuleta789@gmail.com", "Reset Password | Pidrun Team", "Reset Passowrd" , template_html);
// output.then(val => {
//     console.log(val)
// }).catch(err => {
//     console.log(err)
// });
