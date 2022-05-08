const { Contact } = require("./schemaContacts");
const { User, joiRegisterSchema, joiLoginSchema } = require("./user");
const { JoiSchema, favoriteChema } = require("./schemaContacts");

module.exports = {
  Contact,
  User,
  JoiSchema,
  favoriteChema,
  joiRegisterSchema,
  joiLoginSchema,
};
