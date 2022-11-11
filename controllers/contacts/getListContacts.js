const { Contact } = require('../../models');

const getListContacts = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.find({ owner: _id }).populate(
    'owner',
    '_id email subscription',
  );
  console.log(result);
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getListContacts;
