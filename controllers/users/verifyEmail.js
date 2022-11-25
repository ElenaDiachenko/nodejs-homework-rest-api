const { User } = require('../../models');
const { getErrorMessage } = require('../../utils');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res.status(404).json(getErrorMessage(404, `User not found`));
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: '',
  });

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification successful',
  });
};

module.exports = verifyEmail;
