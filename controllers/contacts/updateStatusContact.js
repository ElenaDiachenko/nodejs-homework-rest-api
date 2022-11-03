const { Contact } = require('../../models');
const { getErrorMessage } = require('../../utils');

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite)
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing field favorite',
    });

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
