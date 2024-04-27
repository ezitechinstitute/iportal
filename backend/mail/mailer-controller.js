const nodeMailer = require("nodemailer");

function SendMail(name, email, message) {
  let transporter = nodeMailer.createTransport({
    host: "example@gmail.com", // Your SMTP server host
    port: 465, // Your SMTP server port (default is usually 587)
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAILUSER, // Your email address
      pass: process.env.MAILPASS, // Your email password or application-specific password
    },
  });

  let mailOptions = {
    from: "support@byroadlogistics.com", // Sender email address
    to: email, // List of recipients
    subject: "Free Estimate Quote", // Subject line
    // Plain text body
    // You can also use `html` property to send HTML formatted email
    html: " ", // Email Template
  };
}

module.exports = SendMail;
