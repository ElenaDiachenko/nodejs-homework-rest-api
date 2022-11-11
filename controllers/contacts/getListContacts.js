const { Contact } = require('../../models');

const getListContacts = async (req, res) => {
  const { _id } = req.user;
  const { favorite } = req.query;

  const result = await Contact.find(
    !favorite ? { owner: _id } : { owner: _id, favorite: true },
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
