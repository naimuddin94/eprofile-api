/* eslint-disable prettier/prettier */
const express = require('express');
const multer = require('multer');
const { getAllDataFn, deleteFn } = require('../controller/shared.controller');
const Profile = require('../models/profile.model');
const {
  createProfile,
  updateProfile,
} = require('../controller/profile.controller');
const {
  getDataByOwnerIdFn,
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
      { name: 'project[projectPhoto]', maxCount: 1 },
    ]),
    createProfile,
  );

profileRouter
  .route('/:id')
  .get(getDataByOwnerIdFn(Profile))
  .put(
    upload.fields([
      { name: 'photo', maxCount: 1 },
      { name: 'coverPhoto', maxCount: 1 },
      { name: 'project[projectPhoto]', maxCount: 1 },
    ]),
    updateProfile,
  )
  .delete(deleteFn(Profile));

module.exports = profileRouter;
