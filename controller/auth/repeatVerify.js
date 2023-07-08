const { nodeEmail } = require("../../helpers/");
const { User } = require("../../models");

const repeatVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      code: 400,
      message: "missing required field email",
    });
  }
  const { verify, verificationToken, avatarURL } = await User.findOne({
    email,
  });
  const mail = {
    to: email,
    subject: " подтверждение Email",
    html: `<a target="_blank" href="https://numberphones.onrender.com/api/users/verify/:${verificationToken}">Подтвердить Email</a>`,
  };
  if (!verify) {
    await nodeEmail(mail);

    res.status(200).json({
      status: "200 created",
      user: {
        email,
        avatarURL,
        verificationToken,
      },
    });
  }
  res.status(400).json({
    message: "Verification has already been passed",
  });
};

module.exports = repeatVerify;
