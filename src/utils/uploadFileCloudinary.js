/* eslint-disable prettier/prettier */
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileUploadOnCloudinary = async (fileBuffer) => {
  try {
    // Use a Promise to handle the upload process
    return new Promise((resolve, reject) => {
      // Upload the file buffer to Cloudinary
      cloudinary.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error) {
            reject(error); // Reject the Promise if there's an error
          } else {
            resolve(result.url); // Resolve the Promise with the URL if successful
          }
        })
        .end(fileBuffer);
    });
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    return null;
  }
};

module.exports = { fileUploadOnCloudinary };
