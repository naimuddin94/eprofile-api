/* eslint-disable consistent-return */
const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './public/temp');
    },
    filename(req, file, cb) {
        // const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        // cb(null, `${uniqueSuffix}-${file.originalname}`);
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

module.exports = { upload };
