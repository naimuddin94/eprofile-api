/* eslint-disable prettier/prettier */
const express = require('express');
const multer = require('multer');
const {
  getAllDataFn,
  deleteFn,
  createFn,
} = require('../controller/shared.controller');
const Profile = require('../models/profile.model');
const {
  getDataByOwnerIdFn,
  updateByOwnerIdFn,
} = require('../controller/ownerShared.controller');

const upload = multer();

const profileRouter = express.Router();

profileRouter
  .route('/')
  .get(getAllDataFn(Profile))
  .post(
    upload.fields([
      { name: 'photo', maxCount: 1 },
      { name: 'coverPhoto', maxCount: 1 },
    ]),
    createFn(Profile),
  );

profileRouter
  .route('/:id')
  .get(getDataByOwnerIdFn(Profile))
  .put(updateByOwnerIdFn(Profile))
  .delete(deleteFn(Profile));

module.exports = profileRouter;
