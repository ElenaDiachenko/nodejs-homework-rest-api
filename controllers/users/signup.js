const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { createError } = require('../../utils');
const { joiSignupSchema } = require('../../models/user');

const signup = async (req, res) => {
  const { error } = joiSignupSchema.validate(req.body);
  if (error) throw createError(400, error.message);

  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });
  if (user) throw createError(409, `Email: '${email}' in use`);

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
