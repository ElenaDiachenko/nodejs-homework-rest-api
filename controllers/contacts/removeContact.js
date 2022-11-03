const { Contact } = require('../../models');
const { getErrorMessage } = require('../../utils');

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) return res.status(404).json(getErrorMessage(404, contactId));

  res.status(200).json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = removeContact;
