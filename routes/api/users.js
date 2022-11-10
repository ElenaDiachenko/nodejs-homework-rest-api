const express = require('express');
const router = express.Router();
const { users: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
const { joiSignupSchema, joiLoginSchema } = require('../../models/user');

router.post('/signup', validation(joiSignupSchema), ctrlWrapper(ctrl.signup));

module.exports = router;
