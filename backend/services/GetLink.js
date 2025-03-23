const { SendMailVerifyCode } = require("../mail/mailer-controller");
const { auth } = require("./firebaseAdmin");

const GetVerificationLink = async (req, res) => {
  const { email } = req.body;

  try {
    // Temporary user create karein
    const user = await auth.createUser({
      email,
      emailVerified: false,
    });

    console.log(user.uid);

    // Email verification link generate karein
    const verificationLink = await auth.generateEmailVerificationLink(email);

    // Yahan email ko apne email-sending service ke saath bhejein
    // For example: Nodemailer, SendGrid, etc.
    SendMailVerifyCode(email, verificationLink);
    res.json({ msg: "Verification email sent!", uid: user.uid });
  } catch (error) {
    // console.error("Error sending verification email:", error.message);
    res.json({ msg: error.message });
  }
};

module.exports = GetVerificationLink;
