const { auth } = require("./auth");
const { ctrlWrapper } = require("./ctrlWrapper");
const { upload } = require("./upload");
const { validation, validationFavorite } = require("./validation");

module.exports = {
  auth,
  ctrlWrapper,
  upload,
  validation,
  validationFavorite,
};
