const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const getCurrent = require('./getCurrent');
const updateSubscription = require('./updateSubscription');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./verifyEmail');

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  updateSubscription,
  verifyEmail,
  resendVerifyEmail,
};
