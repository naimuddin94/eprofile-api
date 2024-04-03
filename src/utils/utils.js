/* eslint-disable consistent-return */
// Custom validator function to validate image extensions
const multer = require('multer');

const validateImageExtension = (value) => {
    if (!value.match(/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i)) {
        return false;
    }
};

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './public/temp');
    },
    filename(req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}`);
    },
});

const upload = multer({ storage });

module.exports = { validateImageExtension, upload };
