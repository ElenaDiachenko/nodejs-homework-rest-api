const { Contact } = require('../../models');
const { getErrorMessage } = require('../../utils');

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id } = req.user;

  if (!favorite) {
    return res.status(400).json(getErrorMessage(400, `Missing field favorite`));
  }

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      _id,
      new: true,
    },
  );

  if (!result) {
    return res
      .status(404)
      .json(getErrorMessage(404, `Contact with id=${contactId} not found`));
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = updateStatusContact;
