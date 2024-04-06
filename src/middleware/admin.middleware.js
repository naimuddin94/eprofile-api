const { asyncHandler, ApiError } = require('../utils');

const verifyAdmin = asyncHandler(async (req, res, next) => {
    const isAdmin = req.user.role === 'Admin';
    if (!isAdmin) {
        throw new ApiError(401, 'Forbidden access');
    }
    next();
});

module.exports = { verifyAdmin };
