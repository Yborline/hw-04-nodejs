const { User } = require("../../models");
const gravatar = require("gravatar");
const Jimp = require("jimp");

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
  const newUser = new User({ name, email, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "201 created",
    responseBody: {
      user: {
        name,
        email,
        password,
        avatarURL,
      },
    },
  });
};
module.exports = signup;
