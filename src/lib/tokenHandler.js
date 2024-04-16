const createToken = require('./createToken');
require('dotenv').config();
const { ApiResponse } = require('../utils');

// create auth cookie function
const createAuthCookie = async (req, res, next, userResponse) => {
    try {
        const token = createToken({
            id: userResponse.id,
            email: userResponse.email,
            role: userResponse.role,
        });

        // Set the cookie with the JWT
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        }).json(new ApiResponse(200, userResponse, 'Login success'));
    } catch (err) {
        next(err);
    }
};

// remove cookie from browser session
const clearUserCookie = (req, res) => {
    res.clearCookie('token', {
        maxAge: 0,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    }).json({ message: 'Logout successfully' });
};

module.exports = { createAuthCookie, clearUserCookie };
