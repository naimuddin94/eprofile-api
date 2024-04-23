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

// get single company
const getSingleCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, 'Company id required');
  }

  const company = await Company.findById(id);

  if (!company) {
    throw new ApiError(404, 'Company not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, company, 'Company fetched successfully'));
});

// update company
const updateCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
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

  const company = await Company.findByIdAndUpdate(id, updateObject, {
    new: true,
  });

  if (!company) {
    throw new ApiError(500, 'Something went wrong while updating company');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, company, 'Company updated successfully'));
});

// get all owner company
const getOwnerCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find({ createdBy: req.user.id });

  if (!companies) {
    throw new ApiError(500, 'Something went wrong when fetched company');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, companies, 'Company fetched successfully'));
});

// get all published company
const getAllPublishedCompany = asyncHandler(async (req, res) => {
  const companies = await Company.find({ status: 'published' });

  if (!companies) {
    throw new ApiError(500, 'Something went wrong when fetching companies');
  }

  return res.status(200).json(new ApiResponse(200, companies, 'Fetched companies successfully'));
});

// delete company
const deleteCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, 'Company id required');
  }

  const company = await Company.findById(id);

  const isOwner = company.createdBy === req?.user?.id;

  if (!isOwner && req?.user?.role !== 'Admin') {
    throw new ApiError(400, 'Your are not allowed to delete this company');
  }

  const result = await Company.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(
      404,
      'Something went wrong retrieving data from the database',
    );
  }

  return res.json(new ApiResponse(200, {}, 'Deleted company successfully'));
});

module.exports = {
  createCompany,
  getSingleCompany,
  updateCompany,
  getOwnerCompanies,
  getAllPublishedCompany,
  deleteCompany,
};
