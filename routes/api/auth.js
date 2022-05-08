const express = require("express");
const { validation } = require("../../middlewares/validation");
const { auth } = require("../../middlewares/auth");
const { ctrlWrapper } = require("../../middlewares/ctrlWrapper");
const { joiRegisterSchema, joiLoginSchema } = require("../../models");
const { getCurrent, logout, signup, login } = require("../../controller/auth");

const router = express.Router();

router.post("/signup", validation(joiRegisterSchema), signup);

router.post("/login", validation(joiLoginSchema), login);

router.get("/current", auth, ctrlWrapper(getCurrent));

router.get("/logout", auth, ctrlWrapper(logout));
module.exports = { authRouter: router };
