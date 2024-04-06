const express = require('express');
const {
    updateProfileStatus,
    approvedProfiles,
    pendingProfiles,
} = require('../controller/admin.controller');

const adminRouter = express.Router();

adminRouter.route('/user-profile/:profileId').patch(updateProfileStatus);
adminRouter.route('/approved-profiles').get(approvedProfiles);
adminRouter.route('/pending-profiles').get(pendingProfiles);

module.exports = adminRouter;
