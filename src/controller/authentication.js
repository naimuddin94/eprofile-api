/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { createAuthCookie, clearUserCookie } = require('../lib/tokenHandler');

// user login function
const userLoginFn = () => async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by username or email
        const user = await User.findOne({ email });

        if (!user) {
            // User not found
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            // Passwords don't match
            return res.status(401).json({ message: 'Invalid password' });
        }

        const userResponse = {
            // eslint-disable-next-line no-underscore-dangle
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
        };

        // Create authentication cookie
        createAuthCookie(req, res, next, userResponse);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// user logout function
const userLogoutFn = () => async (req, res) => {
    console.log(req.body);
    try {
        clearUserCookie(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { userLoginFn, userLogoutFn };
