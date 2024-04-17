const express = require('express');
const {
    updateProfileStatus,
    approvedProfiles,
    pendingProfiles,
} = require('../controller/admin.controller');

const adminRouter = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware');

adminRouter.route('/update-status/:profileId').put(verifyToken, verifyAdmin, updateProfileStatus);
adminRouter.route('/approved-profiles').get(verifyToken, verifyAdmin, approvedProfiles);
adminRouter.route('/pending-profiles').get(verifyToken, verifyAdmin, pendingProfiles);

module.exports = adminRouter;
