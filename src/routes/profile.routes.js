/* eslint-disable prettier/prettier */
const express = require('express');
const multer = require('multer');
const Profile = require('../models/profile.model');
const {
  createProfile,
  updateProfile,
  getAllApprovedProfiles,
  deleteProfile,
} = require('../controller/profile.controller');
const { verifyToken } = require('../middleware');
const { getDataByOwnerIdFn } = require('../controller/ownerShared.controller');

const upload = multer();

const profileRouter = express.Router();

profileRouter
  .route('/')
  .get(verifyToken, getAllApprovedProfiles)
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

module.exports = profileRouter;
