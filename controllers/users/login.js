const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { createError } = require('../../utils');
const { joiLoginSchema } = require('../../models/user');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { error } = joiLoginSchema.validate(req.body);
  if (error) throw createError(400, error.message);

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const comparePassword = bcrypt.compareSync(password, user.password);
  if (!user || !comparePassword) {
    throw createError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
