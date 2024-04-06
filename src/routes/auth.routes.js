const express = require('express');

const { userLoginFn, userLogoutFn } = require('../controller/authentication');

const authRouter = express.Router();

authRouter.route('/login').post(userLoginFn());
authRouter.route('/logout').post(userLogoutFn());

module.exports = authRouter;
