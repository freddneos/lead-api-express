require('dotenv')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_IS_SECURE, // upgrade later with STARTTLS
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
});


class emailService {

    constructor() {
        this.checkAvailable();
    }
    checkAvailable() {
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });
    }
    sendEmail(to, message, subject) {
        console.log('enviar-email')
        return new Promise((resolve, reject) => {
            transporter.sendMail({
                from: process.env.EMAIL_ACCOUNT,
                to,
                subject,
                html: message
            }).then(info => {
                console.log(JSON.stringify(info))
                resolve(true)
            }).catch(err => {
                console.log(err)
                reject(false)
            })
        })

    }
}

module.exports = new emailService()