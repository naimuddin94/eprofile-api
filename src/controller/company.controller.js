/* eslint-disable prettier/prettier */
const Company = require('../models/company.model');
const {
  asyncHandler,
  ApiResponse,
  ApiError,
} = require('../utils');
const { fileUploadOnCloudinary } = require('../utils/uploadFileCloudinary');

// create a new company
const createCompany = asyncHandler(async (req, res) => {
  const {
    name,
    username,
    introduction,
    mission,
    history,
    founder,
    location,
    services,
    targetMarket,
    advantage,
    financial,
    achievements,
    partnerships,
    responsibility,
    goals,
    contact,
  } = req.body;

  if (
    [name, username, location, services, targetMarket].some(
      (field) => field?.trim() === '',
    )
  ) {
    throw new ApiError(400, 'Required field missing');
  }

  const userId = req?.user?.id;

  if (!userId) {
    throw new ApiError(401, 'Invalid access');
  }

  let photoUrl;
  let coverPhotoUrl;

  if (
    req.files
    && Array.isArray(req.files.photo)
    && req.files.photo.length > 0
  ) {
    photoUrl = await fileUploadOnCloudinary(
      req?.files?.photo[0]?.buffer,
    );
  }
  if (
    req.files
    && Array.isArray(req.files.coverPhoto)
    && req.files.coverPhoto.length > 0
  ) {
    coverPhotoUrl = await fileUploadOnCloudinary(
      req?.files?.coverPhoto[0]?.buffer,
    );
  }

  const company = await Company.create({
    name,
    username,
    introduction,
    mission,
    history,
    founder,
    location,
    services,
    targetMarket,
    advantage,
    financial,
    achievements,
    partnerships,
    responsibility,
    goals,
    contact,
    createdBy: userId,
    photo: photoUrl || '',
    coverPhoto: coverPhotoUrl || '',
  });

  if (!company) {
    return res.json(
      new ApiResponse(
        500,
        {},
        'Something went wrong while creating company to database',
      ),
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, company, 'Company created successfully'));
});

// get company by created user
const getSingleCompanyByCreator = asyncHandler(async (req, res) => {
  const userId = req?.user?.id;

  console.log(89, userId);

  if (!userId) {
    throw new ApiError(400, 'Invalid user access');
  }

  const company = await Company.find({ createdBy: userId });

  if (!company) {
    throw new ApiError(404, 'Company not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, company, 'Company fetched successfully'));
});

// update company
const updateCompany = asyncHandler(async (req, res) => {
  const { companyId } = req.params;

  if (!companyId) {
    throw new ApiError(400, 'Company id is required');
  }

  let photoUrl;
  let coverPhotoUrl;

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
    coverPhotoUrl = await fileUploadOnCloudinary(
      req?.files?.coverPhoto[0]?.buffer,
    );
  }

  const updateObject = { ...req.body };

  if (photoUrl) {
    updateObject.photo = photoUrl;
  }

  if (coverPhotoUrl) {
    updateObject.coverPhoto = coverPhotoUrl;
  }

  const company = await Company.findByIdAndUpdate(companyId, updateObject, {
    new: true,
  });

  if (!company) {
    throw new ApiError(500, 'Something went wrong while updating company');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, company, 'Company updated successfully'));
});

module.exports = { createCompany, getSingleCompanyByCreator, updateCompany };
