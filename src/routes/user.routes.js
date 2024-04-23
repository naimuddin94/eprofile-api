/* eslint-disable prettier/prettier */
const express = require('express');
const {
  getAllDataFn,
  getSingleDataFn,
  updateFn,
  deleteFn,
  getUserRoleFn,
} = require('../controller/shared.controller');
const {
  registerUser,
  registerUserByAdmin,
} = require('../controller/user.controller');
const User = require('../models/user.model');
const { verifyToken, verifyAdmin } = require('../middleware');

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getAllDataFn(User))
  .post(registerUser);

userRouter
  .route('/:id')
  .get(getSingleDataFn(User))
  .put(updateFn(User))
  .delete(verifyToken, verifyAdmin, deleteFn(User));
userRouter.route('/role/:email').get(getUserRoleFn(User));

userRouter.route('/admin/create').post(verifyToken, verifyAdmin, registerUserByAdmin);

module.exports = userRouter;
