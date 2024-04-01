const express = require('express');

const { userLoginFn, userLogoutFn } = require('../controller/authentication');

const authRouter = express.Router();

authRouter.post('/login', userLoginFn());
authRouter.post('/logout', userLogoutFn());

module.exports = authRouter;
