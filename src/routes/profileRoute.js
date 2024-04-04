/* eslint-disable prettier/prettier */
const express = require('express');
const { createProfile } = require('../controller/profile.controller');
const { getAllDataFn, deleteFn } = require('../controller/shared');
const Profile = require('../models/profile.model');
const { getDataByOwnerIdFn, updateByOwnerIdFn } = require('../controller/ownerShip');
const { upload } = require('../middleware/multer.middleware');

const profileRouter = express.Router();

profileRouter.get('/', getAllDataFn(Profile));
profileRouter.get('/:id', getDataByOwnerIdFn(Profile));
profileRouter.post(
    '/',
    upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }]),
    createProfile,
);
profileRouter.put('/:id', updateByOwnerIdFn(Profile));
profileRouter.delete('/:id', deleteFn(Profile));

module.exports = profileRouter;
