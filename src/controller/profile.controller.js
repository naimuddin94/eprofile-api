const Profile = require('../models/profile.model');
const { asyncHandler, ApiError, ApiResponse } = require('../utils');
const { fileUploadOnCloudinary } = require('../utils/uploadFileCloudinary');

// create a new profile
const createProfile = asyncHandler(async (req, res) => {
    const { project, ...remainData } = req.body;
    let photoUrl;
    let coverUrl;
    let projectPhotoUrl;

    if (req.files && Array.isArray(req.files.photo) && req.files.photo.length > 0) {
        photoUrl = await fileUploadOnCloudinary(req?.files?.photo[0]?.buffer);
    }
    if (req.files && Array.isArray(req.files.coverPhoto) && req.files.coverPhoto.length > 0) {
        coverUrl = await fileUploadOnCloudinary(req?.files?.coverPhoto[0]?.buffer);
    }

    if (req.files && Array.isArray(req.files.projectPhoto) && req.files.projectPhoto.length > 0) {
        projectPhotoUrl = await fileUploadOnCloudinary(req?.files?.projectPhoto[0]?.buffer);
    }

    const result = await Profile.create({
        photo: photoUrl,
        coverPhoto: coverUrl || '',
        project: { projectPhoto: projectPhotoUrl || '', ...project } || {},
        ...remainData,
    });

    if (!result) {
        throw new ApiError(500, 'Something went wrong while save profile');
    }

    return res.status(201).json(new ApiResponse(200, result, 'Saved successfully'));
});

module.exports = { createProfile };
