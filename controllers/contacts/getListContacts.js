const { Contact } = require('../../models');

const getListContacts = async (req, res) => {
  const { _id } = req.user;
  const { favorite, page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    !favorite ? { owner: _id } : { owner: _id, favorite: true },
    '',
    { skip, limit: +limit },
  ).populate('owner', '_id email subscription');

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getListContacts;
