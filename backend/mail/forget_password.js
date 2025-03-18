const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.MAILHOST, // Your SMTP server host
    port: process.env.MAILPORT, // Your SMTP server port (default is usually 587)
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.REGMAIL, // Your email address
      pass: process.env.MAILPASS, // Your email password or application-specific password
    },
});

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `http://localhost:8088/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.REGMAIL, // Sender email address
    to: email,
    subject: "Password Reset Request",
    html: `<p>You requested a password reset. Click the link below to reset your password:</p>
           <a href="${resetUrl}">${resetUrl}</a>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail };