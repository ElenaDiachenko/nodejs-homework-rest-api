const { Contact } = require('../../models');
const { getErrorMessage } = require('../../utils');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Contact.findById(contactId, _id);
  if (!result) {
    return res
      .status(404)
      .json(getErrorMessage(404, `Contact with id: '${contactId}'  not found`));
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = getContactById;
