const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const avatarName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, avatarName);
    // await fs.rename(tempUpload, resultUpload);
    await jimp
      .read(tempUpload)
      .then((avatar) => avatar.resize(250, 250).write(resultUpload))
      .catch((error) => {
        throw error;
      });

    const avatarURL = path.join('public', 'avatars', avatarName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
