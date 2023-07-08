const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const {
  validation,
  validationFavorite,
} = require("../../middlewares/validation");
const { JoiSchema, favoriteChema } = require("../../models/schemaContacts");
const validationMiddleware = validation(JoiSchema);
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updatFavorite,
} = require("../../controller/controller");

router.get("/", auth, listContacts);

router.get("/:contactId", getContactById);

router.post("/", auth, validationMiddleware, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validationMiddleware, updateContact);

router.patch(
  "/:contactId/favorite",
  validationFavorite(favoriteChema),
  updatFavorite
);

module.exports = { contactsRouter: router };
