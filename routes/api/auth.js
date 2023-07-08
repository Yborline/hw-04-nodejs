const express = require("express");

const {
  joiRegisterSchema,
  joiLoginSchema,
  Joiverify,
} = require("../../models");
const {
  getCurrent,
  logout,
  signup,
  login,
  updateAvatar,
  verifyEmail,
  repeatVerify,
} = require("../../controller/auth");
const { upload, ctrlWrapper, validation, auth } = require("../../middlewares/");

const router = express.Router();

router.post("/signup", validation(joiRegisterSchema), signup);

router.post("/login", validation(joiLoginSchema), login);

router.get("/current", auth, ctrlWrapper(getCurrent));

router.get("/logout", auth, ctrlWrapper(logout));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);
router.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));
router.post("/verify", validation(Joiverify), ctrlWrapper(repeatVerify));
module.exports = { authRouter: router };
