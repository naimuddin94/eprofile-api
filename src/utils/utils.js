/* eslint-disable consistent-return */
// Custom validator function to validate image extensions
const validateImageExtension = (value) => {
    if (!value.match(/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i)) {
        return false;
    }
};

module.exports = { validateImageExtension };
