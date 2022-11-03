const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
const { joiSchema, favoriteJoiSchema } = require('../../models/contact');

router.get('/', ctrlWrapper(ctrl.getListContacts));
router.get('/:contactId', ctrlWrapper(ctrl.getContactById));
router.post('/', validation(joiSchema), ctrlWrapper(ctrl.addContact));
router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));
router.put(
  '/:contactId',
  validation(joiSchema),
  ctrlWrapper(ctrl.updateContact),
);
router.patch(
  '/:contactId/favorite',
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact),
);

module.exports = router;
