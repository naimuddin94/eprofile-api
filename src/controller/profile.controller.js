/* eslint-disable prettier/prettier */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
/* eslint-disable no-undef */
const Profile = require('../models/profile.model');
const { asyncHandler, ApiError, ApiResponse } = require('../utils');
const { fileUploadOnCloudinary } = require('../utils/uploadFileCloudinary');

// create a new profile
const createProfile = asyncHandler(async (req, res) => {
    const { project, ...remainData } = req.body;

    const exitsProfile = await Profile.findOne({ createdBy: req?.user?.id });

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
        createdBy: req?.user?.id,
        project: { projectPhoto: projectPhotoUrl || '', ...project } || {},
        ...remainData,
    });

    if (!result) {
        throw new ApiError(500, 'Something went wrong while save profile');
    }

    return res.status(201).json(new ApiResponse(200, result, 'Saved successfully'));
});

// update profile
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

// get all approved profiles
const getAllApprovedProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find({ approved: true });

  if (!profiles) {
    throw new ApiError(500, 'Something went wrong while fetching all profiles');
  }

  return res.status(200).json(new ApiResponse(200, profiles, 'Profiles fetched successfully'));
});

// get single profile by id
const getSingleProfile = asyncHandler(async (req, res) => {
        const { profileId } = req.params;

        if (!profileId) {
            throw new ApiError(400, 'Profile id is required');
        }

        const result = await Profile.findById(profileId);

        if (!result) {
            throw new ApiError(404, 'Profile not found');
        }
        return res.json(new ApiResponse(200, result, 'Profile fetched successfully'));
});

// delete company
const deleteProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, 'Profile id required');
  }

  const profile = await Profile.findById(id);

  const isOwner = profile.createdBy === req?.user?.id;

  if (!isOwner && req?.user?.role !== 'Admin') {
    throw new ApiError(400, 'Your are not allowed to delete this profile');
  }

  const result = await Profile.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(
      404,
      'Something went wrong retrieving data from the database',
    );
  }

  return res.json(new ApiResponse(200, {}, 'Deleted profile successfully'));
});

module.exports = {
  createProfile,
  updateProfile,
  getAllApprovedProfiles,
  deleteProfile,
  getSingleProfile,
};
