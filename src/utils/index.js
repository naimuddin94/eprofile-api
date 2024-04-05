const { ApiError } = require('./ApiError');
const { ApiResponse } = require('./ApiResponse');
const { asyncHandler } = require('./asyncHandler');

// custom image validator
const validateImageExtension = (value) => {
    if (!value.match(/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i)) {
        return false;
    }
};

module.exports = {
    ApiError,
    ApiResponse,
    asyncHandler,
    validateImageExtension,
};
