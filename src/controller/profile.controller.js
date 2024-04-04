/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
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

        console.log(27, req.files);
        let photoUrl;
        let coverUrl;

        if (req.files && Array.isArray(req.files.photo) && req.files.photo.length > 0) {
            photoUrl = await uploadOnCloudinary(req.files.photo[0].path);
        }
        if (req.files && Array.isArray(req.files.coverPhoto) && req.files.coverPhoto.length > 0) {
            coverUrl = await uploadOnCloudinary(req.files.coverPhoto[0].path);
        }

        console.log({ photoUrl, coverUrl });

        const result = await Profile.create({
            fullName,
            photo: photoUrl,
            coverPhoto: coverUrl,
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
