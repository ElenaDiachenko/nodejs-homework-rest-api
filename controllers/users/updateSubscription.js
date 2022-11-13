const { User } = require('../../models');
const { getErrorMessage } = require('../../utils');

const updateSubscription = async (req, res) => {
  const { _id, subscription } = req.user;

  if (!subscription) {
    return res
      .status(400)
      .json(getErrorMessage(400, `Missing field subscription`));
  }

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription: req.body.subscription },
    {
      new: true,
    },
  );

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = updateSubscription;
