const { auth } = require("./firebaseAdmin");

const CheckMailVerified = async (req, res) => {
  const { uid } = req.params; // User ID from frontend
  //   const uid = "pw6ezp3HdsRX5hLv8nYYFhxT6XI2";

  try {
    const user = await auth.getUser(uid);
    if (user.emailVerified) {
      res.json({ isVerified: true });
    } else {
      res.json({ isVerified: false });
    }
  } catch (error) {
    res.json("Error checking email verification");
  }
};

module.exports = CheckMailVerified;