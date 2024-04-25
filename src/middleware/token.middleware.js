const jwt = require('jsonwebtoken');
const { asyncHandler, ApiError } = require('../utils');

const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req?.cookies?.token || req?.cookies?._auth;

    console.log(token);

    if (!token) {
        throw new ApiError(401, 'Unauthorized');
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            throw new ApiError(401, 'Unauthorized');
        }
        req.user = decoded;
        next();
    });
});

module.exports = { verifyToken };
