const { Contact } = require('../../models');
const { createError } = require('../../utils');

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!favorite) throw createError(400, `missing field favorite`);
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    },
  );

  if (!result) return res.status(404).json(getErrorMessage(404, contactId));

  res.status(200).json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = updateStatusContact;
