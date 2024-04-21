/* eslint-disable prettier/prettier */
const express = require('express');
const {
  updateProfileStatus,
  approvedProfiles,
  pendingProfiles,
} = require('../controller/admin.controller');

const adminRouter = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware');
const Company = require('../models/company.model');
const Profile = require('../models/profile.model');

adminRouter
  .route('/update-status/:profileId')
  .put(verifyToken, verifyAdmin, updateProfileStatus);

// TODO: remove this route this is test route
adminRouter
  .route('/update-all-company')
  .put(verifyToken, verifyAdmin, async (req, res) => {
    await Company.updateMany({}, { $set: { status: 'published' } });
    res.json({ message: 'updated all company status' });
  });

adminRouter
  .route('/update-all-profile')
  .put(verifyToken, verifyAdmin, async (req, res) => {
    await Profile.updateMany({}, { $set: { approved: true } });
    res.json({ message: 'All profile approved' });
  });

// development routes end

adminRouter
  .route('/approved-profiles')
  .get(verifyToken, verifyAdmin, approvedProfiles);
adminRouter
  .route('/pending-profiles')
  .get(verifyToken, verifyAdmin, pendingProfiles);

module.exports = adminRouter;
