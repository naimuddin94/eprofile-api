/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
const User = require('../models/user.model');
const { asyncHandler, ApiError, ApiResponse } = require('../utils');

// create a new user to database
const registerUser = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password, date_of_birth, country } = req.body;

    if (Object.values(req.body).some((field) => field.trim() === '')) {
        throw new ApiError(400, 'All fields are required');
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
        throw new ApiError(409, 'User already exists');
    }

    const user = await User.create({
        first_name,
        last_name,
        email,
        password,
        date_of_birth,
        country,
    });

    const createdUser = await User.findById(user._id).select('-password');

    if (!createdUser) {
        throw new ApiError(500, 'Something went wrong while registering the user');
    }

    res.status(201).json(new ApiResponse(201, createdUser, 'Account created successfully'));
});

// create a new user to database
const registerUserByAdmin = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password, date_of_birth, country, role } = req.body;

    if (Object.values(req.body).some((field) => field.trim() === '')) {
        throw new ApiError(400, 'All fields are required');
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
        throw new ApiError(409, 'User already exists');
    }

    const user = await User.create({
        first_name,
        last_name,
        email,
        password,
        date_of_birth,
        country,
        role,
    });

    const createdUser = await User.findById(user._id).select('-password');

    if (!createdUser) {
        throw new ApiError(500, 'Something went wrong while registering the user');
    }

    res.status(201).json(new ApiResponse(201, createdUser, 'Account created successfully'));
});

// fetched single user by id
const getSingleUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, 'Id is required');
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    return res.json(new ApiResponse(200, user, 'User fetched successfully'));
});

// update the user
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const isAdmin = req?.user?.role === 'Admin';

    if (!isAdmin && req.body?.role) {
        delete req.body?.role;
    }

    // Exclude password field from req.body
    if (req?.body?.password) {
        delete req.body.password;
    }

    if (!id) {
        throw new ApiError(400, 'Id required');
    }

    const result = await User.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    if (!result) {
        throw new ApiError(404, 'Something went wrong while updating the user');
    }

    return res.json(new ApiResponse(200, result, 'User updated successfully'));
});

module.exports = { registerUser, registerUserByAdmin, updateUser, getSingleUser };
