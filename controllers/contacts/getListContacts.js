const contactsOperations = require('../../models/contacts');

const getListContacts = async (_, res) => {
  const result = await contactsOperations.listContacts();
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getListContacts;
