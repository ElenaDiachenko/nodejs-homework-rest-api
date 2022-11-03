const { Contact } = require('../../models');

const getListContacts = async (_, res) => {
  const result = await Contact.find({});
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getListContacts;
