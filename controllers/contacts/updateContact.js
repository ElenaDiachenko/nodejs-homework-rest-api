const contactsOperations = require('../../models/contacts');
const { getErrorMessage } = require('../../utils');

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, req.body);

  if (!result) return res.status(404).json(getErrorMessage(404, contactId));

  res.status(200).json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = updateContact;
