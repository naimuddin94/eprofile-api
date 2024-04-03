const Profile = require('../models/profile.model');
const { uploadOnCloudinary } = require('../utils/cloudinary');

const createProfile = async (req, res) => {
    try {
        const {
            fullName,
            title,
            objective,
            contactInformation,
            education,
            experience,
            skills,
            professionalMemberships,
            language,
            volunteerWork,
            project,
            publications,
            testimonials,
            hobbies,
            careerGoals,
            createdBy,
        } = req.body;

        let photoLocalPath;
        let coverPhotoLocalPath;
        if (req.files && Array.isArray(req.files.photo) && req.files.photo.length > 0) {
            photoLocalPath = req.files.photo[0].path;
        }
        if (req.files && Array.isArray(req.files.coverPhoto) && req.files.coverPhoto.length > 0) {
            coverPhotoLocalPath = req.files.coverPhoto[0].path;
        }

        const photo = await uploadOnCloudinary(photoLocalPath);
        const coverPhoto = await uploadOnCloudinary(coverPhotoLocalPath);

        const result = await Profile.create({
            fullName,
            photo,
            coverPhoto,
            title,
            objective,
            contactInformation,
            education,
            experience,
            skills,
            professionalMemberships,
            language,
            volunteerWork,
            project,
            publications,
            testimonials,
            hobbies,
            careerGoals,
            createdBy,
        });

        res.status(201).json({ message: 'Profile saved successfully', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProfile };
