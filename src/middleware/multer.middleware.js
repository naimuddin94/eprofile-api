/* eslint-disable prettier/prettier */
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './public');
    },
    filename(req, file, cb) {
        const fileExt = path.extname(file.originalname);
        const fileName = `${file.originalname
            .replace(fileExt, '')
            .toLocaleLowerCase()
            .split(' ')
            .join('-')}-${Date.now()}`;

        cb(null, fileName + fileExt);
    },
});

const upload = multer({ storage });

module.exports = { upload };
