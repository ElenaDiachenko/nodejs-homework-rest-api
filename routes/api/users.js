const express = require('express');
const router = express.Router();
const { users: ctrl } = require('../../controllers');
const { auth, validation, ctrlWrapper } = require('../../middlewares');
const {
  joiSignupSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  joiEmailSchema,
} = require('../../models/user');

router.post('/signup', validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));
router.post(
  '/verify',
  validation(joiEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail),
);
router.post('/logout', auth, ctrlWrapper(ctrl.logout));
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  '/subscription',
  auth,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription),
);

module.exports = router;
