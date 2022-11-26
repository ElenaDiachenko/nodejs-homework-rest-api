const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { User } = require('../../models');
const { getErrorMessage, sendEmail } = require('../../utils');
const { v4 } = require('uuid');

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(409)
      .json(getErrorMessage(409, `Email: '${email}' in use`));
  }
  const verificationToken = v4();

  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    subscription,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: 'Site registration confirmation',
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Click to confirm registration</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: 'success',
    code: 201,
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL: result.avatarURL,
      verificationToken: result.verificationToken,
    },
  });
};

module.exports = signup;
