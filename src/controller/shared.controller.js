/* eslint-disable prettier/prettier */
const { asyncHandler, ApiResponse, ApiError } = require('../utils');
const { fileUploadOnCloudinary } = require('../utils/uploadFileCloudinary');

// get all data from the database collection
const getAllDataFn = (dbCollectionName) => asyncHandler(async (req, res) => {
    const result = await dbCollectionName.find();

    if (!result) {
        throw new ApiError(404, 'Something went wrong retrieving data from the database');
    }

    return res.json(new ApiResponse(200, result));
    });

// get single data by id from the database collection
const getSingleDataFn = (dbCollectionName) => asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (!id) {
            throw new ApiError(400, 'Id is required');
        }

        const result = await dbCollectionName.findById(id);

        if (!result) {
            throw new ApiError(404, 'Something went wrong retrieving data from the database');
        }
        return res.json(new ApiResponse(200, result));
});

// save new data to database
const createFn = (dbCollectionName) => asyncHandler(async (req, res) => {
    let result;
    if (req.files) {
        let photoUrl;
        let coverUrl;

        if (req.files && Array.isArray(req.files.photo) && req.files.photo.length > 0) {
            photoUrl = await fileUploadOnCloudinary(req?.files?.photo[0]?.buffer);
        }
        if (req.files && Array.isArray(req.files.coverPhoto) && req.files.coverPhoto.length > 0) {
            coverUrl = await fileUploadOnCloudinary(req?.files?.coverPhoto[0]?.buffer);
        }

        result = await dbCollectionName.create({
            photo: photoUrl,
            coverPhoto: coverUrl,
            ...req.body,
        });
    } else {
        result = await dbCollectionName.create(req.body);
    }

        return res
            .status(201)
            .json(new ApiResponse(200, result, 'Saved successfully'));
    });

// update function
const updateFn = (dbCollectionName) => asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, 'Id required');
    }

    // Exclude password field from req.body
    if (req?.body?.password) {
        delete req.body.password;
    }

    const result = await dbCollectionName.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    if (!result) {
       throw new ApiError(404, 'Something went wrong retrieving data from the database');
    }

    return res.json(new ApiResponse(200, 'Updated successfully'));
});

// delete function
const deleteFn = (dbCollectionName) => asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, 'Id required');
    }

    const result = await dbCollectionName.findByIdAndDelete(id);

    if (!result) {
        throw new ApiError(404, 'Something went wrong retrieving data from the database');
    }

    return res.json(new ApiResponse(200, 'Deleted successfully'));
});

// get user role
const getUserRoleFn = (dbCollectionName) => asyncHandler(async (req, res) => {
    const { email } = req.params;
    const user = await dbCollectionName.findOne({ email });

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const { role } = user;
    return res.json(new ApiResponse(200, role));
});

module.exports = {
    getAllDataFn,
    getSingleDataFn,
    createFn,
    updateFn,
    deleteFn,
    getUserRoleFn,
};
