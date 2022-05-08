const { User } = require("../../models");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json({
      status: "400 failed",
      message: "Email in use",
    });
  }
  const newUser = new User({ name, email });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "201 created",
    responseBody: {
      user: {
        email,
        password,
      },
    },
  });
};
module.exports = signup;
