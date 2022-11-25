const { User } = require('../../models');
const { getErrorMessage, sendEmail } = require('../../utils');

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json(getErrorMessage(400, `Missing required field email`));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(getErrorMessage(404, `User not found`));
  }
  if (user.verify) {
    return res
      .status(400)
      .json(getErrorMessage(400, `Verification has already been passed`));
  }
  const mail = {
    to: email,
    subject: 'Site registration confirmation',
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Click to confirm registration</a>`,
  };

  await sendEmail(mail);

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email resent',
  });
};

module.exports = resendVerifyEmail;
