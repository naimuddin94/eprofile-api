/* eslint-disable prettier/prettier */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
/* eslint-disable no-undef */
const Profile = require('../models/profile.model');
const { asyncHandler, ApiError, ApiResponse } = require('../utils');
const { fileUploadOnCloudinary } = require('../utils/uploadFileCloudinary');

// create a new profile
const createProfile = asyncHandler(async (req, res) => {
    const { project, createdBy, ...remainData } = req.body;

    if (!createdBy) {
        throw new ApiError(400, 'User id required');
    }

    const exitsProfile = await Profile.findOne({ createdBy });

    if (exitsProfile) {
        throw new ApiError(400, 'User profile all ready exits');
    }

    let photoUrl;
    let coverUrl;
    let projectPhotoUrl;

    if (req.files && Array.isArray(req.files.photo) && req.files.photo.length > 0) {
        photoUrl = await fileUploadOnCloudinary(req?.files?.photo[0]?.buffer);
    }
    if (req.files && Array.isArray(req.files.coverPhoto) && req.files.coverPhoto.length > 0) {
        coverUrl = await fileUploadOnCloudinary(req?.files?.coverPhoto[0]?.buffer);
    }

    if (
        req.files
        && Array.isArray(req.files['project[projectPhoto]'])
        && req.files['project[projectPhoto]'].length > 0
    ) {
        projectPhotoUrl = await fileUploadOnCloudinary(
            req.files['project[projectPhoto]'][0].buffer,
        );
    }

    const result = await Profile.create({
        photo: photoUrl,
        coverPhoto: coverUrl || '',
        createdBy,
        project: { projectPhoto: projectPhotoUrl || '', ...project } || {},
        ...remainData,
    });

    if (!result) {
        throw new ApiError(500, 'Something went wrong while save profile');
    }

    return res.status(201).json(new ApiResponse(200, result, 'Saved successfully'));
});

const updateProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Exclude password field from req.body
  if (req?.body?.password) {
      delete req.body.password;
  }

    let photoUrl;
    let coverUrl;
    let projectPhotoUrl;

    if (
      req.files
      && Array.isArray(req.files.photo)
      && req.files.photo.length > 0
    ) {
      photoUrl = await fileUploadOnCloudinary(req?.files?.photo[0]?.buffer);
    }
    if (
      req.files
      && Array.isArray(req.files.coverPhoto)
      && req.files.coverPhoto.length > 0
    ) {
      coverUrl = await fileUploadOnCloudinary(
        req?.files?.coverPhoto[0]?.buffer,
      );
    }

    if (
      req.files
      && Array.isArray(req.files['project[projectPhoto]'])
      && req.files['project[projectPhoto]'].length > 0
    ) {
      projectPhotoUrl = await fileUploadOnCloudinary(
        req.files['project[projectPhoto]'][0].buffer,
      );
    }

    const updateObject = { ...req.body };

    if (photoUrl) {
        updateObject.photo = photoUrl;
    }

    if (coverUrl) {
        updateObject.coverPhoto = coverUrl;
    }

    if (projectPhotoUrl) {
        updateObject.project = { projectPhoto: projectPhotoUrl };
    }

  const result = await Profile.findOneAndUpdate(
    { createdBy: id },
    updateObject,
    {
      new: true,
    },
  );

  if (!result) {
    throw new ApiError(401, 'Data not found!');
  }

  return res.status(200).json(new ApiResponse(200, result, 'Updated successfully'));
});

module.exports = { createProfile, updateProfile };
