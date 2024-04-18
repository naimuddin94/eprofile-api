/* eslint-disable prettier/prettier */
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { createAuthCookie, clearUserCookie } = require('../lib/tokenHandler');
const { asyncHandler, ApiError } = require('../utils');

// user login function
const userLoginFn = () => asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Find the user by username or email
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new ApiError(401, 'Invalid credentials!');
    }

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    };

    // Create authentication cookie
    return createAuthCookie(req, res, next, userResponse);
  });

// user logout function
const userLogoutFn = () => asyncHandler(async (req, res) => clearUserCookie(req, res));

module.exports = { userLoginFn, userLogoutFn };
