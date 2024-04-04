/* eslint-disable prettier/prettier */
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileUploadOnCloudinary = async (file) => {
    try {
        console.log(13, file);
        const result = await cloudinary.uploader.upload(file, {
            // Optional parameters, such as folder, tags, etc.
        });
        console.log(result);
        return result.url;
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        return null;
    }
};

module.exports = { fileUploadOnCloudinary };
