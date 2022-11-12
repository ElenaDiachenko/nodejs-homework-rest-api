const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { getErrorMessage } = require('../../utils');

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(409)
      .json(getErrorMessage(409, `Email: '${email}' in use`));
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    subscription,
    email,
    password: hashPassword,
  });

  res.status(201).json({
    status: 'success',
    code: 201,
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;
