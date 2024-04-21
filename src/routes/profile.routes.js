/* eslint-disable prettier/prettier */
const express = require('express');
const multer = require('multer');
const Profile = require('../models/profile.model');
const {
  createProfile,
  updateProfile,
  getAllApprovedProfiles,
  deleteProfile,
  getSingleProfile,
} = require('../controller/profile.controller');
const { verifyToken } = require('../middleware');
const { getDataByOwnerIdFn } = require('../controller/ownerShared.controller');

const upload = multer();

const profileRouter = express.Router();

profileRouter
  .route('/')
  .get(getAllApprovedProfiles)
  .post(
    verifyToken,
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
  .delete(verifyToken, deleteProfile);

profileRouter.route('/single/:profileId').get(getSingleProfile);

module.exports = profileRouter;
