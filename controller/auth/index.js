const signup = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const repeatVerify = require("./repeatVerify");

module.exports = {
  getCurrent,
  signup,
  login,
  logout,
  updateAvatar,
  verifyEmail,
  repeatVerify,
};
