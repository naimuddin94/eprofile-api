const Profile = require('../models/profile.model');
const { asyncHandler, ApiError, ApiResponse } = require('../utils');

// approved profiles
const approvedProfiles = asyncHandler(async (req, res) => {
    const result = await Profile.find({ approved: true });

    if (!result) {
        throw new ApiError(500, 'Something went wrong to get approved profiles');
    }

    return res.status(200).json(new ApiResponse(200, result));
});

// non-approved profiles
const pendingProfiles = asyncHandler(async (req, res) => {
    const result = await Profile.find({ approved: false });

    if (!result) {
        throw new ApiError(500, 'Something went wrong to get approved profiles');
    }

    return res.status(200).json(new ApiResponse(200, result));
});

// update profile status
const updateProfileStatus = asyncHandler(async (req, res) => {
    const { profileId } = req.params;
    const { approved } = req.body;

    if (!profileId || approved === undefined) {
        throw new ApiError(400, 'Profile id and approval status is required');
    }

    const result = await Profile.findByIdAndUpdate(profileId, { approved }, { new: true });

    if (!result) {
        throw new ApiError(500, 'Something went wrong while updating profile approval');
    }

    return res.status(200).json(new ApiResponse(200, result));
});

module.exports = { updateProfileStatus, approvedProfiles, pendingProfiles };
