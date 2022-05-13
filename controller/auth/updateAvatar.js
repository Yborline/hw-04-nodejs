const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");
const updateAvatar = async (req, res, next) => {


  const { path: tempUpload, originalname } = req.file;

  const { _id: id } = req.user;
  const imgName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarDir, imgName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", originalname);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.status(200).json({
      code: 200,
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
