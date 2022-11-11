const { Contact } = require('../../models');
const { createError } = require('../../utils');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) throw createError(404, `Contact with id=${contactId} not found`);

  res.status(200).json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = getContactById;
