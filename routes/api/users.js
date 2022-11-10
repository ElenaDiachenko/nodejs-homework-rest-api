const express = require('express');
const router = express.Router();
const { users: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
const { joiSchema } = require('../../models/user');

router.post('/signup', validation(joiSchema), ctrlWrapper(ctrl.signup));

module.exports = router;
