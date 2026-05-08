const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async (options) => {
    try {
        await transport.sendMail({
            from: '"phones store " <no-reply>',
            to: options.to,
            subject: options.subject,
            html: options.html
        });
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = sendEmail;