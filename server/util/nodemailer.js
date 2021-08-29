const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const mailOptions = (to, subject, text) => {
    return {
        from: process.env.EMAIL,
        to,
        subject,
        text
    }
}

exports.sendMail = async (to, subject, text) => {
    try {
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions(
                to,
                subject,
                text
            ), (error, info) => {
                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    console.log(info)
                    resolve(info);
                }
            });
        });
    } catch (ex) {
        throw ex;
    }
}
