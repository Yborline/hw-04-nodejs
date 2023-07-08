const { User } = require("../../models");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
const { nodeEmail } = require("../../helpers");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json({
      status: "400 failed",
      message: "Email in use",
    });
  }
  const avatarURL = gravatar.url(email);
  Jimp.read(avatarURL)
    .then((avatar) => {
      return avatar.resize(250, 250); // resize
    })
    .catch((err) => {
      console.error(err);
    });
  const verificationToken = nanoid();
  const newUser = new User({ name, email, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: " подтверждение Email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}:">Подтвердить Email</a>`,
  };
  await nodeEmail(mail);
  res.status(201).json({
    status: "201 created",
    responseBody: {
      user: {
        name,
        email,
        password,
        avatarURL,
        verificationToken,
      },
    },
  });
};
module.exports = signup;
