//Description: This function is used to send emails to users

export default async function sendEmailNotification(
  email: String,
  subject: String,
  message: String
) {
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,

    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_SERVER_USER,
    to: email,
    subject: subject,
    html: `<p>${message}</p>`,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
