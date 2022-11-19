const express = require('express');
const router = express.Router();
const { users: ctrl } = require('../../controllers');
const { auth, validation, ctrlWrapper, upload } = require('../../middlewares');
const {
  joiSignupSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
} = require('../../models/user');

router.post('/signup', validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.post('/logout', auth, ctrlWrapper(ctrl.logout));
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  '/subscription',
  auth,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription),
);
router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar),
);

module.exports = router;
